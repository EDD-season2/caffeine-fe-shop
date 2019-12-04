export default class MenuItem {
    constructor (
        private _id: number,
        private _name: string,
        private _desc: string,
        private _price: number
    ) {}

    get id () { return this._id }
    get name () { return this._name }
    get description () { return this._desc }
    get price () { return this._price }
}
