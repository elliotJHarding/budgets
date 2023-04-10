const Config = {};

Config.Endpoints = {}
Config.Endpoints.Domain = "http://192.168.1.115:8000"
const domain = Config.Endpoints.Domain
Config.Endpoints.CreateUser = `${domain}/auth/createuser`
Config.Endpoints.CSRF = `${domain}/auth/csrf`
Config.Endpoints.ObtainToken = `${domain}/auth/token`
Config.Endpoints.ProfileData = `${domain}/user`

export default Config;