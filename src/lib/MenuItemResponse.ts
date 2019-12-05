export default class MenuItemResponse {
    constructor (
        private _id: number,
        private _name: string,
        private _description: string,
        private _price: number
    ) {}

    public static from (json: any): MenuItemResponse {
        return new MenuItemResponse(
            json.id,
            json.name,
            json.description,
            json.price
        )
    }

    get id () { return this._id }
    get name () { return this._name }
    get description () { return this._description }
    get price () { return this._price }
}
