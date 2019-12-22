import { NotificationApi } from './NotificationApi'
import RequestWrapper from './RequestWrapper'

export default class NotificationHttpApi implements NotificationApi {
    public async updateToken (shopId: number, token: string): Promise<number> {
        const res = await RequestWrapper.post(`/v1/subscribe/shops/${shopId}`, { token })
        return res.status
    }
}
