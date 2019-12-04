<template>
<div>
    <Logo/>
    <h2 class="title text-center">메뉴 등록</h2>
    <v-form class="mx-5 py-3 registration-form" @submit="onSubmit" v-model="valid">
        <v-text-field v-model="menuItemName" class="input-shop-name my-2" label="메뉴 이름"/>
        <v-text-field v-model="menuItemDescription" class="input-shop-name my-2" label="설명"/>
        <v-text-field v-model="menuItemPrice" class="input-shop-name my-2" label="가격"/>
        <v-btn type="submit" elevation="0" color="primary" class="mt-3">추가</v-btn>
    </v-form>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Logo from '@/components/Logo.vue'
import { MenuItemApiFactory } from '../lib/MenuItemApi'

@Component({
    components: {
        Logo
    }
})
export default class MenuRegister extends Vue {
    private valid = false
    private menuItemName: string = '';
    private menuItemDescription: string = '';
    private menuItemPrice: string = '';
    private shopId = -1

    private beforeMount () {
        this.shopId = Number(this.$route.params.shopId)
    }

    private onSubmit () {
        console.log({
            name: this.menuItemName,
            desc: this.menuItemDescription,
            price: this.menuItemPrice
        })
        new MenuItemApiFactory().create().addMenu(
            this.menuItemName,
            this.menuItemDescription,
            Number(this.menuItemPrice),
            this.shopId
        )
        .then(menuItem => { this.$router.push(`/shop/${this.shopId}`) })
    }
}
</script>

<style lang="scss" scoped>

</style>
