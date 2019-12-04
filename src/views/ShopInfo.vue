<template>
    <div>
        <Logo/>
        <h2 class="headline mt-3 text-center">{{ shopName }}</h2>
        <v-container>
            <h3 class="title my-3">메뉴</h3>
            <div class="mt-4">
                <v-btn type="button" color="primary" class="mr-3">메뉴 추가</v-btn>
                <v-btn type="button" color="secondary">메뉴 편집</v-btn>
            </div>
        </v-container>
            </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

import Logo from '@/components/Logo.vue'

import { ShopApiFactory } from '../lib/ShopApi'

@Component({
    components: {
        Logo
    }
})
export default class ShopInfo extends Vue {
    private shopId: number = 0
    private shopName: string = ''

    private beforeMount () {
        this.shopId = Number(this.$route.params.shopId)
        new ShopApiFactory().create().findById(this.shopId)
        .then(res => { this.shopName = res.name })
    }
}
</script>
