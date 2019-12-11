export default class MenuItemResponse {
    constructor (
        private _id: number,
        private _name: string,
        private _nameInEnglish: string,
        private _description: string,
        private _price: number,
        private _imgUrl: string
    ) {}

    public static from (json: any): MenuItemResponse {
        return new MenuItemResponse(
            json.id,
            json.name,
            json.nameInEnglish,
            json.description,
            json.price,
            json.imgUrl
        )
    }

    get id () { return this._id }
    get name () { return this._name }
    get nameInEnglish () { return this._nameInEnglish }
    get description () { return this._description }
    get price () { return this._price }
    get imgUrl () { return this._imgUrl }
}
