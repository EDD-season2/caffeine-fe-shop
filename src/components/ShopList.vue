<template>
<v-card elevation="1" class="mx-3">
    <template v-for="(item) in itemProps">
        <ShopListItem :itemProp="item" v-bind:key="item.id"/>
    </template>
</v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import ShopListItem from './ShopListItem.vue'

import Shop from '../model/Shop'
import { Prop } from 'vue-property-decorator'

@Component({
    components: {
        ShopListItem
    }
})
export default class ShopList extends Vue {
    @Prop() private itemProps!: Shop[]
}
</script>

<style lang="scss" scoped>
.shop-list {
    list-style: none;
}
</style>
