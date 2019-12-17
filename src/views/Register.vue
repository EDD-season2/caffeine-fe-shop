<template>
<div>
    <Logo :showHome="false"/>
    <Subtitle text="매장 등록" />
    <v-card class="py-5 px-6 my-3 mx-3">
        <v-form class="mx-5 py-3 registration-form"
            @submit.prevent="onRegisterClick"
            v-model="valid">
            <v-text-field
                v-model="email"
                class="input-shop-name my-2"
                label="이메일"
                type="email"/>
            <v-text-field
                v-model="password"
                class="input-shop-name my-2"
                label="비밀번호"
                type="password"/>
            <v-text-field
                v-model="shopName"
                class="input-shop-name my-2"
                label="매장명"
                type="text"/>
            <v-text-field
                v-model="address"
                class="input-shop-name my-2"
                label="매장 주소"
                type="text"/>
            <v-btn
                class="mt-3"
                elevation="0"
                color="primary"
                type="submit"
                block>완료</v-btn>
        </v-form>
    </v-card>
    <div class="px-3 mx-3 text-right">
        회원이신가요? <router-link to="/login">로그인</router-link>
    </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Logo from '@/components/Logo.vue'
import Subtitle from '@/components/Subtitle.vue'

import { ShopApiFactory } from '../lib/ShopApi'

@Component({
    components: {
        Logo,
        Subtitle
    }
})
export default class Register extends Vue {
    private email = '';
    private password = '';
    private shopName = '';
    private address = '';
    private valid = false;

    private onRegisterClick () {
        const { shopName } = this
        this.shopName = ''
        new ShopApiFactory().create().createShop(shopName)
        .then(location => { this.$router.push('/') })
    }
}
</script>
