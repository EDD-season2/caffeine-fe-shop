import Axios from 'axios'

export default class RequestWrapper {
    private static readonly BASE_URL = '';

    public static async get (url: string) {
        return Axios.get(`${this.BASE_URL}${url}`)
    }

    public static async post (url: string, body: any) {
        return Axios.post(`${this.BASE_URL}${url}`)
    }
}
