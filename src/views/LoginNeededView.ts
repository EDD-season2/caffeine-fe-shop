import Vue from 'vue'
import Component from 'vue-class-component'
import Shop from '@/model/Shop'

@Component
export default class LoginNeededView extends Vue {
    protected async ensureSignedIn () {
        await this.$store.dispatch('refreshCurrentOwner')
        if (this.$store.state.currentShop === Shop.UNAUTHENTICATED) {
            this.$store.dispatch('receiveNotification', '로그인이 필요합니다')
            this.$router.push('/login')
        }
    }
}
