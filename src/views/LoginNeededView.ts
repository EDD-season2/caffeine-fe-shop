import Vue from 'vue'
import Shop from '@/model/Shop'

export default class LoginNeededView extends Vue {
    protected get currentShop (): Promise<Shop> {
        return new Promise((resolve, reject) => {
            this.$store.dispatch('refreshCurrentShop')
            .then(() => {
                resolve(this.$store.state.currentShop)
            })
        })
    }
}
