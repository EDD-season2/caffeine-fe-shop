export default class Shop {
    constructor (
        private _id: number,
        private _name: string,
        private _imageUrl: string,
        private _address: string,
        private _phoneNumber: string
    ) {}

    public static readonly from = (json: any): Shop => {
        return new Shop(json.id, json.name, json.image, json.address, json.phoneNumber)
    }

    get id () { return this._id }
    get name () { return this._name }
    get imageUrl () { return this._imageUrl }
    get address () { return this._address }
    get phoneNumber () { return this._phoneNumber }
}
