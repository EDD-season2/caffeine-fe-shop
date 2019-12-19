export default class MenuItem {
    public static readonly INVALID = new MenuItem(-1, '', '', '', 0, '', '')

    constructor (
        private _id: number,
        private _name: string,
        private _nameInEnglish: string,
        private _description: string,
        private _price: number,
        private _imgUrl: string,
        private _category: string
    ) {}

    public static from (json: any): MenuItem {
        return new MenuItem(
            json.id,
            json.name,
            json.nameInEnglish,
            json.description,
            json.price,
            json.imgUrl,
            json.category
        )
    }

    get id () { return this._id }
    get name () { return this._name }
    get nameInEnglish () { return this._nameInEnglish }
    get description () { return this._description }
    get price () { return this._price }
    get imgUrl () { return this._imgUrl }
    get category () { return this._category }
}
