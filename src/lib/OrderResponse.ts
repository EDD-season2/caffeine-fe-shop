import OrderItemResponse from './OrderItemResponse'

export default class OrderResponse {
    constructor (
        private _id: number,
        private _orderNumber: number,
        private _orderItems: OrderItemResponse[]
    ) {}

    public static from (json: any): OrderResponse {
        return new OrderResponse(
            json.id,
            json.orderNumber,
            json.orderItems.map((v: any) => OrderItemResponse.from(v))
        )
    }

    get id () { return this._id }
    get orderNumber () { return this._orderNumber }
    get orderItems () { return this._orderItems }
}
