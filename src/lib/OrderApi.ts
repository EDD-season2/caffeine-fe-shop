import { MockOrderApi } from './MockApi'
import OrderResponse from './OrderResponse'

export interface OrderApi {
    findById(id: number): Promise<OrderResponse>
    findByShopId(shopId: number): Promise<OrderResponse[]>
    findPendingOrders(): Promise<OrderResponse[]>
    findInProgressOrders(): Promise<OrderResponse[]>
    findFinishedOrders(): Promise<OrderResponse[]>
}

export class OrderApiFactory {
    private static instance: OrderApi;

    public create (): OrderApi {
        if (!OrderApiFactory.instance) {
            OrderApiFactory.instance = new MockOrderApi()
        }
        return OrderApiFactory.instance
    }
}
