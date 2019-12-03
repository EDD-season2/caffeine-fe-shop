import ShopResponse from './ShopResponse'

export default class ShopApi {
    public static readonly findAllShops = async (): Promise<ShopResponse[]> => {
        return [
            { id: 1, name: '스타벅스 잠실점' },
            { id: 2, name: '스타벅스 송파구청점' }
          ].map(ShopResponse.from)
    }

    public static readonly findById = async (id: number): Promise<ShopResponse> => {
        const shops = await ShopApi.findAllShops()
        const found = shops.find(s => s.id === id)
        if (!found) {
            throw new Error('일치하는 매장을 찾을 수 없습니다.')
        }
        return found
    }
}
