import { MenuItemApi } from './MenuItemApi'
import RequestWrapper from './RequestWrapper'
import MenuItem from '@/model/MenuItem'

export default class MenuItemHttpApi implements MenuItemApi {
    public async findById (id: number): Promise<MenuItem> {
        const res = await RequestWrapper.get(`/api/v1/menus/${id}`)
        return MenuItem.from(res.data)
    }

    public async addMenu (name: string, desc: string, price: number, shopId: number): Promise<MenuItem> {
        // TODO: fill the body
        const res = await RequestWrapper.post('/api/v1/menus', {
            name,
            nameInEnglish: '',
            description: desc,
            price,
            imgUrl: '',
            category: '',
            shopId: shopId
        })
        const createdRes = await RequestWrapper.get(res.headers.Location)
        return MenuItem.from(createdRes)
    }

    public async findByShopId (shopId: number): Promise<MenuItem[]> {
        const res = await RequestWrapper.get(`/api/v1/shops/${shopId}/menus`)
        return res.data.map((v: any) => MenuItem.from(v))
    }
}
