import NotificationHttpApi from './NotificationHttpApi'

export interface NotificationApi {
    updateToken(shopId: number, token: string): Promise<number>
}

export class NotificationApiFactory {
    private static instance: NotificationApi

    public static create (): NotificationApi {
        if (!NotificationApiFactory.instance) {
            NotificationApiFactory.instance = new NotificationHttpApi()
        }
        return NotificationApiFactory.instance
    }
}
