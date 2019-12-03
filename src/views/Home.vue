<template>
    <div>
        <router-link to="/register">매장 등록</router-link>
        <ShopList :itemProps="shops"/>
    </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue from 'vue'
import Component from 'vue-class-component'

import ShopList from '@/components/ShopList.vue'
import ShopListItemProp from '@/components/ShopListItem.vue'

import ShopApi from '@/lib/ShopApi'
import Shop from '../model/Shop'

@Component({
    components: {
        ShopList
    }
})
export default class Home extends Vue {
    private shops: Shop[] = [];

    constructor () {
      super()
        const { shops } = this
        ShopApi.findAllShops()
        .then(_shops => {
            this.shops.splice(0, this.shops.length)
            _shops.map(res => new Shop(res.id, res.name)).forEach(v => this.shops.push(v))
        })
    }
}
</script>
