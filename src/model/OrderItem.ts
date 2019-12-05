export default class OrderItem {
    constructor (
        private _id: number,
        private _menuItemId: number,
        private _quantity: number
    ) {}

    get id () { return this._id }
    get menuItem () { return this._menuItemId }
    get quantity () { return this._quantity }
}
