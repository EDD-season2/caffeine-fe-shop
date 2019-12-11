import { ShopApi } from './ShopApi'
import ShopResponse from './ShopResponse'
import RequestWrapper from './RequestWrapper'

export default class ShopHttpApi implements ShopApi {
    public async retrieveCurrentShop (): Promise<ShopResponse> {
        // TODO: change when avaiable
        const res = await RequestWrapper.get('/v1/shops/102')
        return ShopResponse.from(res.data)
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

    public async findAllShops (): Promise<ShopResponse[]> {
        const res = await RequestWrapper.get('/v1/shops')
        return res.data.map((v: any) => ShopResponse.from(v))
    }

    public async findById (id: number): Promise<ShopResponse> {
        const res = (await RequestWrapper.get(`/v1/shops/${id}`))
        return ShopResponse.from(res)
    }
}
