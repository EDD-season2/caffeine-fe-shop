<template>
<div>
    <Logo :showHome="false"/>
    <Subtitle :text="shop.name"/>
    <h2 class="title registered-shops-header my-2 mt-4 ml-4">주문내역</h2>
    <v-tabs
        @change="onTabSwitch"
        :centered="true"
        :grow="true">
        <v-tabs-slider></v-tabs-slider>
        <v-tab>결제된 주문</v-tab>
        <v-tab>처리중인 주문</v-tab>
        <v-tab>처리된 주문</v-tab>
        <v-tab-item>
            <PendingOrderList :orders="pendingOrders" />
        </v-tab-item>
        <v-tab-item>
            <OrderList :orders="orders" class="mx-3"/>
        </v-tab-item>
        <v-tab-item>
            처리된
        </v-tab-item>
    </v-tabs>
</div>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue from 'vue'
import Component from 'vue-class-component'

import Logo from '@/components/Logo.vue'
import Subtitle from '@/components/Subtitle.vue'
import OrderList from '@/components/OrderList.vue'
import PendingOrderList from '@/components/PendingOrderList.vue'

import { ShopApiFactory } from '@/lib/ShopApi'
import Shop from '../model/Shop'
import Order from '../model/Order'
import { OrderApiFactory } from '../lib/OrderApi'
import OrderItem from '../model/OrderItem'
import ShopResponse from '../lib/ShopResponse'

@Component({
    components: {
        Logo,
        Subtitle,
        OrderList,
        PendingOrderList
    }
})
export default class Home extends Vue {
    private shop: ShopResponse = new ShopResponse(0, '');
    private orders: Order[] = [];
    private pendingOrders: Order[] = [];
    private orderApi = new OrderApiFactory().create();
    private shopApi = new ShopApiFactory().create();
    private shopName = '';
    private showShopName = false;

    private beforeMount () {
        // TODO: Chnage to use actual shop id later
        this.orderApi.findByShopId(1)
        .then(orders => {
            this.orders.splice(0, this.orders.length)
            orders.forEach(v => this.orders.push(new Order(v.id, v.orderNumber, v.orderItems.map(i => new OrderItem(i.id, i.menuItemId, i.quantity)))))
        })
        this.shopApi.retrieveCurrentShop()
        .then(shop => {
            this.shop = shop
        })
    }

    private onTabSwitch (idx: number) {
        if (idx === 0) {
            this.refreshPendingOrders()
        }
    }

    private refreshPendingOrders () {
        this.orderApi.findPendingOrders()
       .then(orders => {
            this.pendingOrders.splice(0, this.pendingOrders.length)
            orders.forEach(v => this.pendingOrders.push(new Order(v.id, v.orderNumber, v.orderItems.map(i => new OrderItem(i.id, i.menuItemId, i.quantity)))))
        })
    }
}
</script>

<style lang="scss" scoped>
.btn-register {
    background-color: #f88379d6;
    border: none;
    color: #ffffff;
    height: 48px;
    width: 100%;
}

.registered-shops-header {
    font-size: 18pt;
    text-align: left;
}
</style>
