<template>
    <v-container>
        <v-row>
            <v-col class="text-center pt-5">
                <h1 class="logo-title">CAFFEINE</h1>
                <h2>매장 로그인</h2>
                <v-form
                    @submit.prevent="handleLoginClick">
                    <v-card class="py-5 px-6 my-3 mx-3">
                        <v-text-field
                            class="mb-3"
                            label="이메일"
                            v-model="email"/>
                        <v-text-field
                            class="my-3"
                            label="비밀번호"
                            v-model="password"
                            type="password"/>
                        <v-btn
                            color="primary"
                            :loading="loading"
                            block
                            type="submit">로그인</v-btn>
                    </v-card>
                </v-form>
                <div class="px-3 mx-3 text-right">
                    아직 회원이 아니신가요? <router-link to="/register">회원가입</router-link>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { OwnerApiFactory } from '../lib/OwnerApi'
import Owner from '../model/Owner'

@Component
export default class ShopLogin extends Vue {
    private loading = false
    private email = ''
    private password = ''

    private async created () {
        await this.$store.dispatch('refreshCurrentOwner')
        if (this.$store.state.currentOwner !== Owner.UNAUTHENTICATED) {
            this.$router.push('/')
        }
    }

    private handleLoginClick () {
        this.loading = true
        const ownerApi = OwnerApiFactory.create()
        ownerApi.login(this.email, this.password)
        .then(async (message) => {
            this.clearInput()
            if (message === 'ok') {
                await this.$store.dispatch('refreshCurrentOwner')
                this.$router.push('/')
                return
            }
            this.loading = false
            this.$store.dispatch('receiveNotification', message)
        })
    }

    private clearInput () {
        this.email = ''
        this.password = ''
    }
}
</script>

<style lang="scss" scoped>
.logo-title {
    color: #746060;
    font-family: 'Segoe UI';
    text-align: center
}
</style>
