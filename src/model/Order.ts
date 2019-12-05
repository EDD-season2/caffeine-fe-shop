import OrderItem from './OrderItem'

export default class Order {
    constructor (
        private _id: number,
        // 주문 번호, 주문 id와는 다른 값임
        private _orderNumber: number,
        private _orderItems: OrderItem[]
    ) {}

    get id () { return this._id }
    get orderNumber () { return this._orderNumber }
    get orderItems () { return this._orderItems }
}
