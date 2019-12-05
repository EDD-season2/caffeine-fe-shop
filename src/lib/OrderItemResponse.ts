export default class OrderItemResponse {
    constructor (
        private _id: number,
        private _menuItemId: number,
        private _quantity: number
    ) {}

    public static from (json: any) {
        return new OrderItemResponse(
            json.id,
            json.menuItemId,
            json.quantity
        )
    }

    get id () { return this._id }
    get menuItemId () { return this._menuItemId }
    get quantity () { return this._quantity }
}
