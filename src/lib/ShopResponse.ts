export default class ShopResponse {
    constructor (
        private _id: number,
        private _name: string,
        private _imageUrl: string,
        private _address: string,
        private _phoneNumber: string
    ) {}

    public static readonly from = (json: any): ShopResponse => {
        return new ShopResponse(json.id, json.name, json.image, json.address, json.phoneNumber)
    }

    get id () { return this._id }
    get name () { return this._name }
    get imageUrl () { return this._imageUrl }
    get address () { return this._address }
    get phoneNumber () { return this._phoneNumber }
}
