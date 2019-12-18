export default class Owner {
    public constructor (
        private _id: number,
        private _email: string
    ) {}

    public static from (json: any) {
        return new Owner(
            json.id,
            json.email
        )
    }

    get id () { return this._id }
    get email () { return this._email }
}
