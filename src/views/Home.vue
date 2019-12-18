<template>
<v-card>
    <Logo
        title="주문내역"
        :showHome="false">
        <template v-slot:extension>
            <v-tabs
                @change="onTabSwitch"
                :grow="true">
                <v-tabs-slider></v-tabs-slider>
                <v-tab>결제된 주문</v-tab>
                <v-tab>처리중인 주문</v-tab>
                <v-tab>처리된 주문</v-tab>
                <v-tab-item>
                    <PendingOrderList :orders="pendingOrders" />
                </v-tab-item>
                <v-tab-item>
                    <OrderList :orders="inProgressOrders" class="mx-3"/>
                </v-tab-item>
                <v-tab-item>
                    <OrderList :orders="finishedOrders" class="mx-3"/>
                </v-tab-item>
            </v-tabs>
        </template>
    </Logo>
</v-card>
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
import LoginNeededView from './LoginNeededView'

@Component({
    components: {
        Logo,
        Subtitle,
        OrderList,
        PendingOrderList
    }
})
export default class Home extends LoginNeededView {
    private shop: Shop = new Shop(0, '', '', '', '');
    private shopApi = new ShopApiFactory().create();

    private async created () {
        this.currentShop
        .then(shop => {
            if (shop === Shop.UNAUTHENTICATED) {
                this.$router.push('/login')
                return
            }
            this.shop = shop
        })
    }

    private onTabSwitch (idx: number) {
        if (this.$store.state.currentShop === Shop.UNAUTHENTICATED) {
            return
        }
        if (idx === 0) {
            this.$store.dispatch('refreshPending')
        }
        if (idx === 1) {
            this.$store.dispatch('refreshInProgress')
        }
        if (idx === 2) {
            this.$store.dispatch('refreshFinished')
        }
    }

    private get pendingOrders () {
        return this.$store.state.orders.pending
    }

    private get inProgressOrders () {
        return this.$store.state.orders.inProgress
    }

    private get finishedOrders () {
        return this.$store.state.orders.finished
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
