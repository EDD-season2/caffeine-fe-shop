<template>
    <div>
        <Logo/>
        <h2 class="headline mt-3 text-center">{{ shopName }}</h2>
        <v-container>
            <h3 class="title my-3">메뉴</h3>
            <div class="mt-4">
                <v-btn type="button" color="primary" class="mr-3" @click="onRegisterMenuClick">메뉴 추가</v-btn>
                <v-btn type="button" color="secondary">메뉴 편집</v-btn>
            </div>
            <MenuItemList :menuItems="menuItems"/>
        </v-container>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

import Logo from '@/components/Logo.vue'
import MenuItemList from '@/components/MenuItemList.vue'

import { ShopApiFactory } from '../lib/ShopApi'
import MenuItem from '../model/MenuItem'
import { MenuItemApiFactory } from '../lib/MenuItemApi'

@Component({
    components: {
        Logo,
        MenuItemList
    }
})
export default class ShopInfo extends Vue {
    private shopId: number = 0
    private shopName: string = ''
    private menuItems: MenuItem[] = []

    private beforeMount () {
        this.shopId = Number(this.$route.params.shopId)
        const shopApi = new ShopApiFactory().create()
        const menuItemApi = new MenuItemApiFactory().create()
        shopApi.findById(this.shopId)
        .then(res => { this.shopName = res.name })
        .then(() => menuItemApi.findByShopId(this.shopId))
        .then(menus => {
            this.menuItems.splice(this.menuItems.length)
            menus.forEach(v => this.menuItems.push(v))
        })
    }

    private onRegisterMenuClick () {
        this.$router.push(`/shop/${this.shopId}/menu-register`)
    }
}
</script>
