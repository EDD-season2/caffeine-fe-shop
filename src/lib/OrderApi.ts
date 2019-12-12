import OrderHttpApi from './OrderHttpApi'
import Order from '@/model/Order'

export interface OrderApi {
    findById(shopId: number, orderId: number): Promise<Order>
    findPendingOrders(shopId: number): Promise<Order[]>
    findInProgressOrders(shopId: number): Promise<Order[]>
    findFinishedOrders(shopId: number): Promise<Order[]>
    acceptOrder(id: number): Promise<any>
    rejectOrder(id: number): Promise<any>
    finishOrder(id: number): Promise<any>
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
