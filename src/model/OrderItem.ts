export default class OrderItem {
    constructor (
        private _id: number,
        private _menuItemId: number,
        private _quantity: number
    ) {}

    public static from (json: any) {
        return new OrderItem(
            json.id,
            json.menuItemId,
            json.quantity
        )
    }

    get id () { return this._id }
    get menuItemId () { return this._menuItemId }
    get quantity () { return this._quantity }
}
