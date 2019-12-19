import Vue from 'vue'
import Component from 'vue-class-component'
import Owner from '@/model/Owner'

@Component
export default class LoginNeededView extends Vue {
    protected async ensureSignedIn () {
        await this.$store.dispatch('refreshCurrentOwner')
        if (this.$store.state.currentOwner === Owner.UNAUTHENTICATED) {
            this.$store.dispatch('receiveNotification', '로그인이 필요합니다')
            this.$router.push('/login')
        }
    }
}
