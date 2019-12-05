<template>
<div>
    <Logo />
    <Subtitle text="주문 상세"/>
    {{ order.orderNumber }}
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Logo from '@/components/Logo.vue'
import Subtitle from '@/components/Subtitle.vue'

import { OrderApiFactory } from '../lib/OrderApi'
import OrderResponse from '../lib/OrderResponse'
import Order from '../model/Order'
import OrderItem from '../model/OrderItem'

@Component({
    components: {
        Logo,
        Subtitle
    }
})
export default class OrderDetail extends Vue {
    private order?: Order = new Order(0, 0, []);

    private beforeMount () {
        // TODO: Must be changed later
        new OrderApiFactory().create().findById(Number(this.$route.params.orderId))
        .then(order => {
            this.order = new Order(order.id, order.orderNumber, order.orderItems.map(v => new OrderItem(v.id, v.menuItemId, v.quantity)))
        })
    }
}
</script>
