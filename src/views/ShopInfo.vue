<template>
<div>
    <h2>[{{ shopId }}]</h2>
</div>
</template>

<script lang="ts">
import Vue from 'vue'

import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component
export default class ShopInfo extends Vue {
    private shopId: number = 0

    private beforeMount () {
        this.shopId = Number(this.$route.params.shopId)
    }
}
</script>

<style>
</style>
