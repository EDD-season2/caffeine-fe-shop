import { MockMenuItemApi } from './MockApi'
import MenuItemResponse from './MenuItemResponse'

export interface MenuItemApi {
    findById: (id: number) => Promise<MenuItemResponse>
    addMenu: (name: string, desc: string, price: number, shopId: number) => Promise<MenuItemResponse>
    findByShopId: (shopId: number) => Promise<MenuItemResponse[]>
}

export interface MenuItemApiFactory {
    create: () => MenuItemApi
}

export class MenuItemApiFactory implements MenuItemApiFactory {
    private static instance: MenuItemApi;

    public create = (): MenuItemApi => {
        if (!MenuItemApiFactory.instance) {
            MenuItemApiFactory.instance = new MockMenuItemApi()
        }
        return MenuItemApiFactory.instance
    }
}
