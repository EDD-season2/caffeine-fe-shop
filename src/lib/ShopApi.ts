import ShopResponse from './ShopResponse'
import { MockShopApi } from './MockApi'

export interface ShopApi {
    // Returns location of shop entity resource
    retrieveCurrentShop(): Promise<ShopResponse>
    createShop(name: string): Promise<string>
    findAllShops(): Promise<ShopResponse[]>
    findById(id: number): Promise<ShopResponse>
}

export class ShopApiFactory {
    private static instance: ShopApi;

    public create (): ShopApi {
        if (!ShopApiFactory.instance) {
            ShopApiFactory.instance = new MockShopApi()
        }
        return ShopApiFactory.instance
    }
}
