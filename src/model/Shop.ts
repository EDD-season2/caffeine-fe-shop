import MenuItem from './MenuItem'

export default class Shop {
    constructor (
        private _id: number,
        private _name: string,
        private _menus: MenuItem[]
    ) {}

    get id () { return this._id }
    get name () { return this._name }
    get menus () { return this._menus }
}
