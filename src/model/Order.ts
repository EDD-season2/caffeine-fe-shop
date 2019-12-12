import MenuItem from './MenuItem'

export default class Order {
    constructor (
        private _id: number,
        private _state: string,
        private _orderNumber: number,
        private _orderItems: MenuItem[]
    ) {}

    public static from (json: any): Order {
        return new Order(
            json.id,
            json.status,
            json.orderNumber,
            json.orderItems.map((v: any) => MenuItem.from(v))
        )
    }

    get id () { return this._id }
    get state () { return this._state }
    get orderNumber () { return this._orderNumber }
    get orderItems () { return this._orderItems }
}
