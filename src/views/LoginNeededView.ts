import Vue from 'vue'
import Component from 'vue-class-component'
import Shop from '@/model/Shop'

@Component
export default class LoginNeededView extends Vue {
    protected ensureSignedIn () {
        if (this.$store.state.currentShop === Shop.UNAUTHENTICATED) {
            this.$store.dispatch('receiveNotification', '로그인이 필요합니다')
            this.$router.push('/login')
        }
    }

    protected get currentShop (): Promise<Shop> {
        return new Promise((resolve, reject) => {
            this.$store.dispatch('refreshCurrentShop')
            .then(() => {
                resolve(this.$store.state.currentShop)
            })
        })
    }
}
