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
            <OrderList :orders="inProgressOrders" class="mx-3"/>
        </v-tab-item>
        <v-tab-item>
            <OrderList :orders="finishedOrders" class="mx-3"/>
        </v-tab-item>
    </v-tabs>
    <v-snackbar
        class="mx-3 mb-2"
        v-model="showSnackbar">
        {{ snackbarText }}
        <v-btn
          color="pink"
          text
          @click="showSnackbar = false"
        >
          Close
        </v-btn>
    </v-snackbar>
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

@Component({
    components: {
        Logo,
        Subtitle,
        OrderList,
        PendingOrderList
    }
})
export default class Home extends Vue {
    private shop: Shop = new Shop(0, '', '', '', '');
    private shopApi = new ShopApiFactory().create();
    private shopName = '';
    private showShopName = false;
    private showSnackbar = false;
    private snackbarText = '';

    private beforeMount () {
        this.shopApi.retrieveCurrentShop()
        .then(shop => {
            this.shop = shop
        })

        if (this.$route.query.notify === 'orderAccepted') {
            this.$emit('notify', '주문을 접수했습니다.')
        }

        if (this.$route.query.notify === 'orderRejected') {
            this.$emit('notify', '주문을 거절했습니다.')
        }

        if (this.$route.query.notify === 'orderFinished') {
            this.$emit('notify', '주문을 완료했습니다.')
        }
    }

    private onTabSwitch (idx: number) {
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
