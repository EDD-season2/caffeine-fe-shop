import Shop from './Shop'

export default class Owner {
    public static readonly UNAUTHENTICATED = new Owner(-1, '', [])

    public constructor (
        private _id: number,
        private _email: string,
        private _shops: Shop[]
    ) {}

    public static from (json: any) {
        return new Owner(
            json.id,
            json.email,
            [Shop.from(json.shop)]
        )
    }

    get id () { return this._id }
    get email () { return this._email }
    get shops () { return this._shops }
}
