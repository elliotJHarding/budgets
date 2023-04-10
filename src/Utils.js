import Config from './Config'
import axios from "axios";

export const getCsrfToken = async () => {
    let response = await axios.get(Config.Endpoints.CSRF)
    let token =  response.data.csrfToken
    document.cookie = ''
    return token
}

