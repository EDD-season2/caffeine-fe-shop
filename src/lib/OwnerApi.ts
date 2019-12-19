import OwnerHttpApi from './OwnerHttpApi'
import Owner from '@/model/Owner'

export default interface OwnerApi {
    retrieveCurrentOwner(): Promise<Owner>
    signup(request: SignupRequest): Promise<string>
    login(email: string, password: string): Promise<string>
    logout(): Promise<string>
}

export class OwnerApiFactory {
    private static instance: OwnerApi;

    public static create (): OwnerApi {
        if (!OwnerApiFactory.instance) {
            OwnerApiFactory.instance = new OwnerHttpApi()
        }
        return OwnerApiFactory.instance
    }
}

export class SignupRequest {
    public constructor (
        private _email: string,
        private _password: string,
        private _shopName: string,
        private _address: string
    ) {}

    public toJson () {
        return {
            email: this._email,
            password: this._password,
            shopName: this._shopName,
            shopAddress: this._address
        }
    }
}
