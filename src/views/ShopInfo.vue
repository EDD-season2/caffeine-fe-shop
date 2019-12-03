<template>
    <div>
        <h2>[{{ shopId }}] {{ shopName }}</h2>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import ShopApi from '../lib/ShopApi'

@Component
export default class ShopInfo extends Vue {
    private shopId: number = 0
    private shopName: string = ''

    private beforeMount () {
        this.shopId = Number(this.$route.params.shopId)
        ShopApi.findById(this.shopId)
        .then(res => { this.shopName = res.name })
    }
}
</script>

<style>
</style>
