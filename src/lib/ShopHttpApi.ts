import { ShopApi } from './ShopApi'
import RequestWrapper from './RequestWrapper'
import Shop from '@/model/Shop'

export default class ShopHttpApi implements ShopApi {
    public async retrieveCurrentShop (): Promise<Shop> {
        // TODO: change when avaiable
        const res = await RequestWrapper.get('/v1/shops/110')
        if (res.status === 401) {
            return Shop.UNAUTHENTICATED
        }
        return Shop.from(res.data)
    }

    public async createShop (name: string): Promise<string> {
        // TODO: fill the body
        return (await RequestWrapper.post('/v1/shops', {
            name,
            image: '',
            address: '',
            phoneNumber: ''
        }))
        .headers.Location
    }

    public async findAllShops (): Promise<Shop[]> {
        const res = await RequestWrapper.get('/v1/shops')
        return res.data.map((v: any) => Shop.from(v))
    }

    public async findById (id: number): Promise<Shop> {
        const res = (await RequestWrapper.get(`/v1/shops/${id}`))
        return Shop.from(res)
    }
}
