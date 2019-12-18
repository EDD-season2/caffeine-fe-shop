<template>
<div>
    <Logo
        title="매장 등록"/>
    <v-card class="mx-3 my-3">
    <v-form class="mx-5 py-3 registration-form"
        @submit.prevent="onRegisterClick">
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
            type="submit"
            elevation="0"
            color="primary"
            class="mt-3"
            :loading="loading">완료</v-btn>
    </v-form>
    </v-card>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Logo from '@/components/Logo.vue'
import Subtitle from '@/components/Subtitle.vue'

import { ShopApiFactory } from '../lib/ShopApi'
import { OwnerApiFactory, SignupRequest } from '../lib/OwnerApi'
import Owner from '../model/Owner'

@Component({
    components: {
        Logo
    }
})
export default class Register extends Vue {
    private email = '';
    private password = '';
    private shopName = '';
    private address = '';
    private loading = false;

    private onRegisterClick () {
        this.loading = true
        const ownerApi = OwnerApiFactory.create()
        ownerApi.signup(
            new SignupRequest(
                this.email,
                this.password,
                this.shopName,
                this.address
            )
        )
        .then((message: string) => {
            if (!message) return
            if (message === 'ok') {
                return ownerApi.login(this.email, this.password)
            }
            this.loading = false
            return this.$store.dispatch('receiveNotification', message)
        })
        .then((message: string) => {
            if (!message) Promise.resolve()
            if (message === 'ok') {
                this.$router.push('/')
            }
        })
    }
}
</script>
