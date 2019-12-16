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
        return this.findByStatus(shopId, 'in_progress')
    }

    public async findFinishedOrders (shopId: number): Promise<Order[]> {
        return this.findByStatus(shopId, 'finished')
    }

    public async acceptOrder (shopId: number, id: number): Promise<number> {
        const res = await RequestWrapper.put(`/v1/shops/${shopId}/orders/${id}/accept`, {})
        return res.status
    }

    public async rejectOrder (shopId: number, id: number): Promise<number> {
        const res = await RequestWrapper.put(`/v1/shops/${shopId}/orders/${id}/reject`, {})
        return res.status
    }
    public async finishOrder (shopId: number, id: number): Promise<any> {
        const res = await RequestWrapper.put(`/v1/shops/${shopId}/orders/${id}/finish`, {})
        return res.status
    }
}
