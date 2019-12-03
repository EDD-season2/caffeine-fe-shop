export default class ShopResponse {
    constructor (
        private _id: number,
        private _name: string
    ) {}

    public static readonly from = (json: any): ShopResponse => {
        return new ShopResponse(json.id, json.name)
    }

    get id () { return this._id }
    get name () { return this._name }
}
