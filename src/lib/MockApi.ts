import { ShopApi } from './ShopApi'
import ShopResponse from './ShopResponse'
import { MenuItemApi } from './MenuItemApi'
import MenuItem from '@/model/MenuItem'
import MenuItemResponse from './MenuItemResponse'

const shops: any[] = [
    {
        id: 1,
        name: '스타벅스 잠실점',
        menus: [
        { id: 1, name: '아메리카노', description: '고소한 아메리카노', price: 2500 }
    ] },
    { id: 2, name: '스타벅스 송파구청점', menus: [] }
]
const menuItems: any[] = [
    { id: 1, name: '아메리카노', description: '고소한 아메리카노', price: 2500 }
]
let nextId = 3
let nextMenuItemId = 2

export class MockShopApi implements ShopApi {
    public async createShop (name: string): Promise<string> {
        const id = nextId++
        shops.push({ id, name })
        return `/v1/shops/${id}`
    }

    public async findAllShops (): Promise<ShopResponse[]> {
        return shops.map(ShopResponse.from)
    }

    public async findById (id: number): Promise<ShopResponse> {
        const shops = await this.findAllShops()
        const found = shops.find(s => s.id === id)
        if (!found) {
            throw new Error('일치하는 매장을 찾을 수 없습니다.')
        }
        return ShopResponse.from(found)
    }
}

export class MockMenuItemApi implements MenuItemApi {
    public async findById (id: number): Promise<MenuItemResponse> {
        const found = menuItems.find(v => v.id === id)
        if (!found) {
            throw new Error('일치하는 메뉴를 찾을 수 없습니다.')
        }
        return found
    }

    public async addMenu (name: string, desc: string, price: number, shopId: number): Promise<MenuItemResponse> {
        const shop = shops.find(v => v.id === shopId)
        const menuItem = { id: nextMenuItemId++, name, description: desc, price }
        shop.menus.push(menuItem)
        menuItems.push(menuItem)
        return MenuItemResponse.from(menuItem)
    }

    public async findByShopId (shopId: number): Promise<MenuItemResponse[]> {
        return shops.find(v => v.id === shopId).menus
        .map(v => MenuItemResponse.from(v))
    }
}
