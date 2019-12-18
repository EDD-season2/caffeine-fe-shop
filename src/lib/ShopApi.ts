import ShopHttpApi from './ShopHttpApi'
import Shop from '@/model/Shop'

export interface ShopApi {
    createShop(name: string): Promise<string>
    findAllShops(): Promise<Shop[]>
    findById(id: number): Promise<Shop>
}

export class ShopApiFactory {
    private static instance: ShopApi;

    public create (): ShopApi {
        if (!ShopApiFactory.instance) {
            ShopApiFactory.instance = new ShopHttpApi()
        }
        return ShopApiFactory.instance
    }
}
