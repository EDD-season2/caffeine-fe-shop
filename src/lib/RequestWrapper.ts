import Axios from 'axios'

export default class RequestWrapper {
    private static readonly BASE_URL = 'http://localhost:8080';

    public static subscribe (url: string) {
        return new EventSource(`${RequestWrapper.BASE_URL}${url}`)
    }

    public static async get (url: string) {
        return Axios.get(`${RequestWrapper.BASE_URL}${url}`)
    }

    public static async post (url: string, body: any) {
        return Axios.post(`${RequestWrapper.BASE_URL}${url}`)
    }
}
