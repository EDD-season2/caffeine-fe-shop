<template>
<v-card elevation="0">
    <template v-for="(item) in orders">
        <OrderListItem :order="item" v-bind:key="item.id"/>
    </template>
</v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

import OrderListItem from './OrderListItem.vue'

import Order from '@/model/Order'

@Component({
    components: {
        OrderListItem
    }
})
export default class OrderList extends Vue {
    @Prop() private orders!: Order[];
}
</script>

<style lang="scss" scoped>
</style>
