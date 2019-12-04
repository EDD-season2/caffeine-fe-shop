<template>
<div>
    <Logo :showHome="false"/>
    <router-link to="/register" class="mx-2 d-block"><button class="btn-register">매장 등록</button></router-link>
    <h2 class="title registered-shops-header my-2 mt-4 ml-4">등록된 매장</h2>
    <ShopList :itemProps="shops"/>
</div>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue from 'vue'
import Component from 'vue-class-component'

import Logo from '@/components/Logo.vue'
import ShopList from '@/components/ShopList.vue'
import ShopListItemProp from '@/components/ShopListItem.vue'

import { ShopApiFactory } from '@/lib/ShopApi'
import Shop from '../model/Shop'

@Component({
    components: {
        Logo,
        ShopList
    }
})
export default class Home extends Vue {
    private shops: Shop[] = [];

    constructor () {
      super()
        const { shops } = this
        new ShopApiFactory().create().findAllShops()
        .then(_shops => {
            this.shops.splice(0, this.shops.length)
            _shops.map(res => new Shop(res.id, res.name)).forEach(v => this.shops.push(v))
        })
    }
}
</script>

<style lang="scss" scoped>
.btn-register {
    background-color: #f88379d6;
    border: none;
    color: #ffffff;
    height: 48px;
    width: 100%;
}

.registered-shops-header {
    font-size: 18pt;
    text-align: left;
}
</style>
