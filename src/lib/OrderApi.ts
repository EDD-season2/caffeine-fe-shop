import OrderHttpApi from './OrderHttpApi'
import Order from '@/model/Order'

export interface OrderApi {
    findById(shopId: number, orderId: number): Promise<Order>
    findPendingOrders(shopId: number): Promise<Order[]>
    findInProgressOrders(shopId: number): Promise<Order[]>
    findFinishedOrders(shopId: number): Promise<Order[]>
    acceptOrder(shopId: number, id: number): Promise<number>
    rejectOrder(shopId: number, id: number): Promise<number>
    finishOrder(shopId: number, id: number): Promise<number>
}

export class OrderApiFactory {
    private static instance: OrderApi;

    public create (): OrderApi {
        if (!OrderApiFactory.instance) {
            OrderApiFactory.instance = new OrderHttpApi()
        }
        return OrderApiFactory.instance
    }
}
