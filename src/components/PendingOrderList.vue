<template>
<v-card flat>
    <template v-for="(item) in orders">
        <PendingOrderListItem :orderText="orderText" :orderId="item.id" v-bind:key="item.id"/>
    </template>
</v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

import PendingOrderListItem from './PendingOrderListItem.vue'

import Order from '../model/Order'

@Component({
    components: {
        PendingOrderListItem
    }
})
export default class PendingOrderList extends Vue {
    @Prop() private orders!: Order[];
    private orderText = '아메리카노(1) 외';
}
</script>
