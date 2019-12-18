import OwnerApi, { SignupRequest } from './OwnerApi'
import RequestWrapper from './RequestWrapper'

export default class OwnerHttpApi implements OwnerApi {
    public async signup (signRequest: SignupRequest) {
        const res = await RequestWrapper.post('/v1/owners', signRequest.toJson())
        if (res.status === 201) {
            return 'ok'
        }
        return res.data.message
    }

    public async login (email: string, password: string) {
        const res = await RequestWrapper.post('/v1/onwers/login', { email, password })
        if (res.status === 200) {
            return 'ok'
        }
        return res.data.message
    }

    public async logout () {
        const res = await RequestWrapper.get('/v1/owners/logout')
        if (res.status === 200) {
            return 'ok'
        }
        return res.data.message
    }
}
