const Config = {};

Config.Endpoints = {}
Config.Endpoints.Domain = process.env.BACKEND_URL
const domain = Config.Endpoints.Domain
Config.Endpoints.CreateUser = `${domain}/auth/createuser`
Config.Endpoints.CSRF = `${domain}/auth/csrf`
Config.Endpoints.ObtainToken = `${domain}/auth/token`
Config.Endpoints.ProfileData = `${domain}/user`

Config.Endpoints.Transactions = `${domain}/transactions`

Config.Endpoints.Tags = `${domain}/tags`

Config.Endpoints.Rules = `${domain}/rules`

Config.Endpoints.Reports = `${domain}/reports`

Config.Endpoints.Banks = `${domain}/institutions`

Config.Endpoints.Requisition = `${domain}/requisition`

Config.Endpoints.UpdateAccounts = `${domain}/accounts/update`

Config.Endpoints.Holidays = `${domain}/holidays`


export default Config;