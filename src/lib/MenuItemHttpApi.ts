import { MenuItemApi } from './MenuItemApi'
import RequestWrapper from './RequestWrapper'
import MenuItemResponse from './MenuItemResponse'

export default class MenuItemHttpApi implements MenuItemApi {
    public async findById (id: number): Promise<MenuItemResponse> {
        const res = await RequestWrapper.get(`/v1/menus/${id}`)
        return MenuItemResponse.from(res.data)
    }

    public async addMenu (name: string, desc: string, price: number, shopId: number): Promise<MenuItemResponse> {
        // TODO: fill the body
        const res = await RequestWrapper.post('/v1/menus', {
            name,
            nameInEnglish: '',
            description: desc,
            price,
            imgUrl: '',
            category: '',
            shopId: shopId
        })
        const createdRes = await RequestWrapper.get(res.headers.Location)
        return MenuItemResponse.from(createdRes)
    }

    public async findByShopId (shopId: number): Promise<MenuItemResponse[]> {
        const res = await RequestWrapper.get(`/v1/shops/${shopId}/menus`)
        return res.data.map((v: any) => MenuItemResponse.from(v))
    }
}
