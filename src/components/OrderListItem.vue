<template>
<router-link :to="`/order/${order.id}`" class="d-block py-3">
    <v-list-item>
        <v-list-item-content>
            <v-list-item-title>{{ order.orderItems[0].name }}</v-list-item-title>
        </v-list-item-content>
    </v-list-item>
</router-link>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

import Order from '../model/Order'

@Component
export default class OrderListItem extends Vue {
    private orderText = '주문번호 1234 아메리카노(1) 외';
    @Prop() private order!: Order;
}
</script>

<style lang="scss" scoped>

</style>
