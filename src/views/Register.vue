<template>
<div>
    <Logo/>
    <h2 class="title text-center">매장 등록</h2>
    <v-form class="mx-5 py-3 registration-form" @submit="onRegisterClick" v-model="valid">
        <v-text-field v-model="shopName" class="input-shop-name my-2" label="매장명"/>
        <v-btn type="submit" elevation="0" color="primary" class="mt-3">완료</v-btn>
    </v-form>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Logo from '@/components/Logo.vue'

import { ShopApiFactory } from '../lib/ShopApi'

@Component({
    components: {
        Logo
    }
})
export default class Register extends Vue {
    private shopName = '';
    private valid = false;

    private onRegisterClick () {
        const { shopName } = this
        this.shopName = ''
        new ShopApiFactory().create().createShop(shopName)
        .then(location => { this.$router.push('/') })
    }
}
</script>

<style lang="scss" scoped>
h2 {
    font-size: 14pt;
}
</style>
