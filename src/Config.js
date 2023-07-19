const Config = {};

Config.Endpoints = {}
Config.Endpoints.Domain = "http://192.168.1.115:8000"
const domain = Config.Endpoints.Domain
Config.Endpoints.CreateUser = `${domain}/auth/createuser`
Config.Endpoints.CSRF = `${domain}/auth/csrf`
Config.Endpoints.ObtainToken = `${domain}/auth/token`
Config.Endpoints.ProfileData = `${domain}/user`

Config.Endpoints.Transactions = {}
Config.Endpoints.Transactions.get = `${domain}/transactions`
Config.Endpoints.Transactions.tag = `${domain}/transactions/tag`

Config.Endpoints.Banks = `${domain}/institutions`

Config.Endpoints.Requisition = `${domain}/requisition`

Config.Endpoints.UpdateAccounts = `${domain}/accounts/update`


export default Config;