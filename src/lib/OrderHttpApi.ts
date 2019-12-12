import { OrderApi } from './OrderApi'
import RequestWrapper from './RequestWrapper'
import Order from '@/model/Order'

export default class OrderHttpApi implements OrderApi {
    public async findById (shopId: number, orderId: number): Promise<Order> {
        const res = await RequestWrapper.get(`/v1/shops/${shopId}/orders/${orderId}`)
        return Order.from(res.data)
    }

    public async findPendingOrders (shopId: number): Promise<Order[]> {
        return this.findByStatus(shopId, 'pending')
    }

    private async findByStatus (shopId: number, status: string) {
        const res = await RequestWrapper.get(`/v1/shops/${shopId}/orders?status=${status}`)
        return res.data.map((v: any) => Order.from(v))
    }

    public async findInProgressOrders (shopId: number): Promise<Order[]> {
        return this.findByStatus(shopId, 'pending')
    }

    public async findFinishedOrders (shopId: number): Promise<Order[]> {
        return this.findByStatus(shopId, 'finished')
    }

    public async acceptOrder (id: number): Promise<any> {
        return {}
    }

    public async rejectOrder (id: number): Promise<any> {
        return {}
    }
    public async finishOrder (id: number): Promise<any> {
        return {}
    }
}
