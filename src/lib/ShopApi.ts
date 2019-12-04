import ShopResponse from './ShopResponse'
import MenuItem from '@/model/MenuItem'
import { MockShopApi } from './MockApi'

export interface ShopApi {
    // Returns location of shop entity resource
    createShop: (name: string) => Promise<string>
    findAllShops: () => Promise<ShopResponse[]>
    findById: (id: number) => Promise<ShopResponse>
}

export interface ShopApiFactory {
    create: () => ShopApi
}

export class ShopApiFactory implements ShopApiFactory {
    private static instance: ShopApi;

    public create = (): ShopApi => {
        if (!ShopApiFactory.instance) {
            ShopApiFactory.instance = new MockShopApi()
        }
        return ShopApiFactory.instance
    }
}
