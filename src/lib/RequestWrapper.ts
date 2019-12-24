import Axios, { AxiosRequestConfig } from 'axios'

export default class RequestWrapper {
    private static readonly BASE_URL = 'https://shop.caffe-ine.me/api';

    private static config: AxiosRequestConfig = {
        validateStatus: (status: number) => {
            return status < 500
        },
        withCredentials: true
    }

    public static subscribe (url: string) {
        return new EventSource(`${RequestWrapper.BASE_URL}${url}`)
    }

    public static async get (url: string) {
        return Axios.get(`${RequestWrapper.BASE_URL}${url}`, RequestWrapper.config)
    }

    public static async post (url: string, body: any) {
        return Axios.post(`${RequestWrapper.BASE_URL}${url}`, body, RequestWrapper.config)
    }

    public static async put (url: string, body: any) {
        return Axios.put(`${RequestWrapper.BASE_URL}${url}`, body, RequestWrapper.config)
    }
}
