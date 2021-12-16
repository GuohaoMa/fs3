package config

type UserConfigParams struct {
	SwanAddress            string `json:"swan_address"`
	Fs3VolumeAddress       string `json:"fs_3_volume_address"`
	Fs3WalletAddress       string `json:"fs_3_wallet_address"`
	CarFileSize            string `json:"car_file_size"`
	IpfsApiAddress         string `json:"ipfs_api_address"`
	IpfsGateway            string `json:"ipfs_gateway"`
	SwanToken              string `json:"swan_token"`
	LotusClientApiUrl      string `json:"lotus_client_api_url"`
	LotusClientAccessToken string `json:"lotus_client_access_token"`
	VolumeBackupAddress    string `json:"volume_backup_address"`
	DBHost                 string `json:"db_host"`
	DBUser                 string `json:"db_user"`
	DBPassword             string `json:"db_password"`
	DBName                 string `json:"db_name"`
	DBPort                 string `json:"db_port"`
	UserId                 int    `json:"user_id"`
}

var UserConfig *UserConfigParams

func InitUserConfig(swanAddress, fs3VolumeAddress, fs3WalletAddress, carFileSize, ipfsApiAddress, ipfsGateway, swanToken, lotusClientApiUrl, lotusClientAccessToken, volumeBackupAddress, dbHost, dbUser, dbPassword, dbName, dbPort string, userId int) *UserConfigParams {
	UserConfig = new(UserConfigParams)
	UserConfig.SwanAddress = swanAddress
	UserConfig.Fs3VolumeAddress = fs3VolumeAddress
	UserConfig.Fs3WalletAddress = fs3WalletAddress
	UserConfig.CarFileSize = carFileSize
	UserConfig.IpfsApiAddress = ipfsApiAddress
	UserConfig.IpfsGateway = ipfsGateway
	UserConfig.SwanToken = swanToken
	UserConfig.LotusClientApiUrl = lotusClientApiUrl
	UserConfig.LotusClientAccessToken = lotusClientAccessToken
	UserConfig.VolumeBackupAddress = volumeBackupAddress
	UserConfig.DBHost = dbHost
	UserConfig.DBUser = dbUser
	UserConfig.DBPassword = dbPassword
	UserConfig.DBName = dbName
	UserConfig.DBPort = dbPort
	UserConfig.UserId = userId
	return UserConfig
}

// Using this function to get a connection, you can create your connection pool here.
func GetUserConfig() *UserConfigParams {
	return UserConfig
}
