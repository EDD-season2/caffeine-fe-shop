import MenuItemHttpApi from './MenuItemHttpApi'
import MenuItem from '@/model/MenuItem'

export interface MenuItemApi {
    findById(id: number): Promise<MenuItem>
    addMenu(name: string, desc: string, price: number, shopId: number): Promise<MenuItem>
    findByShopId(shopId: number): Promise<MenuItem[]>
}

export class MenuItemApiFactory {
    private static instance: MenuItemApi;

    public create (): MenuItemApi {
        if (!MenuItemApiFactory.instance) {
            MenuItemApiFactory.instance = new MenuItemHttpApi()
        }
        return MenuItemApiFactory.instance
    }
}
