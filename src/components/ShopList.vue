<template>
<ul class="shop-list">
    <template v-for="(item) in itemProps">
        <ShopListItem :itemProp="item" v-bind:key="item.id"/>
    </template>
</ul>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import ShopListItem, { ShopListItemProp } from './ShopListItem.vue'

import Shop from '../model/Shop'
import { Prop } from 'vue-property-decorator'

@Component({
    components: {
        ShopListItem
    }
})
export default class ShopList extends Vue {
    @Prop() private itemProps!: ShopListItemProp[]
}
</script>

<style lang="scss" scoped>
.shop-list {
    list-style: none;
}
</style>
