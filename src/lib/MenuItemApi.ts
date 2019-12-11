import MenuItemResponse from './MenuItemResponse'
import MenuItemHttpApi from './MenuItemHttpApi'

export interface MenuItemApi {
    findById(id: number): Promise<MenuItemResponse>
    addMenu(name: string, desc: string, price: number, shopId: number): Promise<MenuItemResponse>
    findByShopId(shopId: number): Promise<MenuItemResponse[]>
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
