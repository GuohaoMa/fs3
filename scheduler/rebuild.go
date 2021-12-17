package scheduler

import (
	"encoding/json"
	"errors"
	"fmt"
	"github.com/filswan/go-swan-lib/client"
	"github.com/minio/minio/internal/config"
	"github.com/minio/minio/logs"
	"github.com/robfig/cron"
	"gorm.io/gorm"
	"os"
	"os/exec"
	"path/filepath"
	"strconv"
	"strings"
	"time"
)

func RebuildScheduler() {
	c := cron.New()
	//backup scheduler
	interval := "@every 10m"
	err := c.AddFunc(interval, func() {
		logs.GetLogger().Println("---------- rebuild volume scheduler is running at " + time.Now().Format("2006-01-02 15:04:05") + " ----------")
		err := RebuildVolumeScheduler()
		if err != nil {
			logs.GetLogger().Error(err)
			return
		}
	})
	if err != nil {
		logs.GetLogger().Error(err)
		return
	}
	c.Start()
}

func RebuildVolumeScheduler() error {
	//open backup db
	db, err := GetFS3Db()
	if err != nil {
		logs.GetLogger().Error(err)
		return err
	}

	//close db
	sqlDB, err := db.DB()
	if err != nil {
		logs.GetLogger().Error(err)
		return err
	}
	defer sqlDB.Close()

	////get one running rebuild jobs from db
	//runningRebuildJobs, err := GetOneRunningRebuildJob(db)
	//if err != nil {
	//	logs.GetLogger().Error(err)
	//	return err
	//}
	//if runningRebuildJobs == nil {
	//	return err
	//}
	//if runningRebuildJobs[0].ID == 0 {
	//	logs.GetLogger().Info("No running rebuild job")
	//	return err
	//}
	//
	////retrieve
	//err = RebuildVolumeAndUpdateDb(runningRebuildJobs[0], db)
	//if err != nil {
	//	logs.GetLogger().Error(err)
	//	return err
	//}

	//get one running rebuild jobs per user from db
	runningRebuildJobs, err := GetOneRunningRebuildJobPerUser(db)
	if err != nil {
		logs.GetLogger().Error(err)
		return err
	}
	if runningRebuildJobs == nil {
		return err
	}
	if runningRebuildJobs[0].ID == 0 {
		logs.GetLogger().Info("No running rebuild job")
		return err
	}

	//retrieve
	err = RebuildVolumeAndUpdateDbPerUser(runningRebuildJobs, db)
	if err != nil {
		logs.GetLogger().Error(err)
		return err
	}
	return err
}

func GetOneRunningRebuildJob(db *gorm.DB) ([]VolumeRebuildJob, error) {
	var runningRebuildJob VolumeRebuildJob
	if err := db.Where("status=?", StatusRebuildTaskCreated).Or("status=?", StatusRebuildTaskRunning).First(&runningRebuildJob).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			logs.GetLogger().Info("No record found in database")
		} else {
			logs.GetLogger().Error(err)
			return []VolumeRebuildJob{}, err
		}
	}
	var runningRebuildJobs []VolumeRebuildJob
	runningRebuildJobs = append(runningRebuildJobs, runningRebuildJob)
	return runningRebuildJobs, nil
}

func GetOneRunningRebuildJobPerUser(db *gorm.DB) ([]VolumeRebuildJob, error) {
	var users []User
	if err := db.Find(&users).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			logs.GetLogger().Info("No record found in database")
			return []VolumeRebuildJob{}, nil
		} else {
			logs.GetLogger().Error(err)
			return []VolumeRebuildJob{}, err
		}
	}
	var runningRebuildJobs []VolumeRebuildJob
	for _, v := range users {
		var runningRebuildJob VolumeRebuildJob
		if err := db.Where("user_id=? And status=?", v.SwanUserId, StatusRebuildTaskCreated).Or("status=?", StatusRebuildTaskRunning).First(&runningRebuildJob).Error; err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				logs.GetLogger().Info("No record found in database")
			} else {
				logs.GetLogger().Error(err)
				return []VolumeRebuildJob{}, err
			}
		}
		runningRebuildJobs = append(runningRebuildJobs, runningRebuildJob)
		return runningRebuildJobs, nil
	}
	return runningRebuildJobs, nil
}

type VolumeRebuildTask struct {
	RebuildTaskID int    `json:"rebuildTaskID"`
	CreatedOn     string `json:"createdOn"`
	UpdatedOn     string `json:"updatedOn"`
	MinerId       string `json:"miner_id"`
	DealCid       string `json:"deal_cid"`
	PayloadCid    string `json:"payload_cid"`
	BackupTaskId  int    `json:"backupTaskId"`
	Status        string `json:"status"`
}

type VolumeRebuildJobs struct {
	VolumeRebuildTasks                []VolumeRebuildTask `json:"volumeRebuildTasks"`
	VolumeRebuildTasksCounts          int                 `json:"volumeRebuildTasksCounts"`
	CompletedVolumeRebuildTasksCounts int                 `json:"completedVolumeRebuildTasksCounts"`
	InProcessVolumeRebuildTasksCounts int                 `json:"inProcessVolumeRebuildTasksCounts"`
	FailedVolumeRebuildTasksCounts    int                 `json:"failedVolumeRebuildTasksCounts"`
}

func RebuildVolumeAndUpdateDb(rebuildJob VolumeRebuildJob, db *gorm.DB) error {
	// get volume path
	volumePath, err := VolumePath()
	if err != nil {
		logs.GetLogger().Error(err)
		return err
	}

	timestamp := strconv.FormatInt(time.Now().UTC().UnixNano()/1000, 10)

	//rename previous version volume
	if _, err := os.Stat(volumePath); !os.IsNotExist(err) {
		dir, file := filepath.Split(volumePath)
		fileBase, fileExt := strings.TrimSuffix(filepath.Base(file), filepath.Ext(file)), filepath.Ext(file)
		_, err = exec.Command("mv", volumePath, dir+fileBase+"_"+timestamp+fileExt).Output()
		if err != nil {
			logs.GetLogger().Error(err)
			return err
		}
	}

	//retrieve deal
	err = LotusRpcClientRetrieve(rebuildJob.MinerId, rebuildJob.PayloadCid, volumePath)
	if err != nil {
		logs.GetLogger().Error(err)
		return err
	}
	logs.GetLogger().Info("Rebuild job done, ID: ", rebuildJob.ID)

	//update db
	rebuildTimestamp := strconv.FormatInt(time.Now().UTC().UnixNano()/1000, 10)
	rebuildJob.UpdatedOn = rebuildTimestamp
	rebuildJob.Status = StatusRebuildTaskCompleted
	if err := db.Save(&rebuildJob).Error; err != nil {
		logs.GetLogger().Error(err)
		return err
	}
	return err
}

func RebuildVolumeAndUpdateDbPerUser(rebuildJobs []VolumeRebuildJob, db *gorm.DB) error {
	for _, v := range rebuildJobs {
		// get volume path
		volumePath, err := VolumePath()
		if err != nil {
			logs.GetLogger().Error(err)
			continue
		}

		timestamp := strconv.FormatInt(time.Now().UTC().UnixNano()/1000, 10)

		//rename previous version volume
		if _, err := os.Stat(volumePath); !os.IsNotExist(err) {
			dir, file := filepath.Split(volumePath)
			fileBase, fileExt := strings.TrimSuffix(filepath.Base(file), filepath.Ext(file)), filepath.Ext(file)
			_, err = exec.Command("mv", volumePath, dir+fileBase+"_"+timestamp+fileExt).Output()
			if err != nil {
				logs.GetLogger().Error(err)
				continue
			}
		}

		//retrieve deal
		err = LotusRpcClientRetrieve(v.MinerId, v.PayloadCid, volumePath)
		if err != nil {
			logs.GetLogger().Error(err)
			continue
		}
		logs.GetLogger().Info("Rebuild job done, ID: ", v.ID)

		//update db
		rebuildTimestamp := strconv.FormatInt(time.Now().UTC().UnixNano()/1000, 10)
		v.UpdatedOn = rebuildTimestamp
		v.Status = StatusRebuildTaskCompleted
		if err := db.Save(&v).Error; err != nil {
			logs.GetLogger().Error(err)
			continue
		}
	}
	return nil
}

func LotusRpcClientRetrieve(minerId string, payloadCid string, outputPath string) error {
	clientRetrieveDealParamDataPartOne := ClientRetrieveDealParamDataPartOne{
		Root: Cid{
			Cid: payloadCid,
		},
		Size:        42,
		Total:       "0",
		UnsealPrice: "0",
		Client:      minerId,
		Miner:       minerId,
	}
	clientRetrieveDealParamDataPartTwo := ClientRetrieveDealParamDataPartTwo{
		Path:  outputPath,
		IsCAR: false,
	}
	var params []interface{}
	params = append(params, clientRetrieveDealParamDataPartOne, clientRetrieveDealParamDataPartTwo)
	jsonRpcParams := LotusJsonRpcParams{
		JsonRpc: LOTUS_JSON_RPC_VERSION,
		Method:  LOTUS_CLIENT_Retrieve_DEAL,
		Params:  params,
		Id:      LOTUS_JSON_RPC_ID,
	}
	response := client.HttpGet(config.GetUserConfig().LotusClientApiUrl, config.GetUserConfig().LotusClientAccessToken, jsonRpcParams)
	if response == "" {
		err := fmt.Errorf("failed to retrieve data %s from miner %s, no response", payloadCid, minerId)
		logs.GetLogger().Error(err)
		return err
	}
	lotusJsonRpcResult := &LotusJsonRpcResult{}
	err := json.Unmarshal([]byte(response), lotusJsonRpcResult)
	if err != nil {
		logs.GetLogger().Error(err)
		return err
	}
	if lotusJsonRpcResult.Error != nil {
		err := fmt.Errorf("failed to retrieve data %s from miner %s, message: %s", payloadCid, minerId, lotusJsonRpcResult.Error.Message)
		logs.GetLogger().Error(err)
		return err
	}
	return err
}

type ClientRetrieveDealParamDataPartOne struct {
	Root        Cid
	Size        int
	Total       string
	UnsealPrice string
	Client      string
	Miner       string
}

type ClientRetrieveDealParamDataPartTwo struct {
	Path  string
	IsCAR bool
}

type VolumeRebuildJob struct {
	ID               int `gorm:"primary_key"`
	UserId           int
	UserRebuildJobId int
	MinerId          string
	DealCid          string
	PayloadCid       string
	Status           string
	CreatedOn        string
	UpdatedOn        string
	BackupJobID      int
	BackupPlanName   string
	BackupJob        VolumeBackupJob `gorm:"foreignKey:BackupJobID;references:ID"`
}
