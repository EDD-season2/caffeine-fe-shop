<template>
    <div class="p-rel">
        <Logo
            title="매장 정보"/>
        <v-container>
            <v-subheader>메뉴</v-subheader>
            <MenuItemList :menuItems="menuItems"/>
        </v-container>
        <v-btn
            @click="onRegisterMenuClick"
            color="primary"
            fixed
            fab
            right
            bottom><v-icon>mdi-plus</v-icon>
        </v-btn>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

import Logo from '@/components/Logo.vue'
import MenuItemList from '@/components/MenuItemList.vue'
import LoginNeededView from './LoginNeededView'

import { ShopApiFactory } from '../lib/ShopApi'
import MenuItem from '../model/MenuItem'
import { MenuItemApiFactory } from '../lib/MenuItemApi'
import Shop from '@/model/Shop'

@Component({
    components: {
        Logo,
        MenuItemList
    }
})
export default class ShopInfo extends LoginNeededView {
    private shop = Shop.UNAUTHENTICATED
    private shopName: string = ''
    private menuItems: MenuItem[] = []

    private async created () {
        await this.ensureSignedIn()
        const menuItemApi = new MenuItemApiFactory().create()
        this.menuItems = await menuItemApi.findByShopId(this.$store.state.currentShop.id)
        this.shop = this.$store.state.currentShop
    }

    private onRegisterMenuClick () {
        this.$router.push(`/shop/${this.shop.id}/menu-register`)
    }
}
</script>
