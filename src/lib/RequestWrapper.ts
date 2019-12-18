import Axios from 'axios'

export default class RequestWrapper {
    private static readonly BASE_URL = '/api';

    private static validateStatus (status: number) {
        return status < 500
    }

    public static subscribe (url: string) {
        return new EventSource(`${RequestWrapper.BASE_URL}${url}`)
    }

    public static async get (url: string) {
        return Axios.get(`${RequestWrapper.BASE_URL}${url}`, {
            validateStatus: RequestWrapper.validateStatus
        })
    }

    public static async post (url: string, body: any) {
        return Axios.post(`${RequestWrapper.BASE_URL}${url}`, body, {
            validateStatus: RequestWrapper.validateStatus
        })
    }

    public static async put (url: string, body: any) {
        return Axios.put(`${RequestWrapper.BASE_URL}${url}`, body, {
            validateStatus: RequestWrapper.validateStatus
        })
    }
}
