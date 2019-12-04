import ShopResponse from './ShopResponse'

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

class MockShopApi implements ShopApi {
    private static shops: any[] = [
        { id: 1, name: '스타벅스 잠실점' },
        { id: 2, name: '스타벅스 송파구청점' }
    ];
    private static nextId = 3;

    public readonly createShop = async (name: string): Promise<string> => {
        const id = MockShopApi.nextId++
        MockShopApi.shops.push({ id, name })
        return `/v1/shops/${id}`
    }

    public readonly findAllShops = async (): Promise<ShopResponse[]> => {
        return MockShopApi.shops.map(ShopResponse.from)
    }

    public readonly findById = async (id: number): Promise<ShopResponse> => {
        const shops = await this.findAllShops()
        const found = shops.find(s => s.id === id)
        if (!found) {
            throw new Error('일치하는 매장을 찾을 수 없습니다.')
        }
        return found
    }
}
