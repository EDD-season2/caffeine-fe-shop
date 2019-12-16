import Vue from 'vue'
import Vuex from 'vuex'

import { OrderApiFactory } from '@/lib/OrderApi'
import Order from '@/model/Order'
import Shop from '@/model/Shop'
import { ShopApiFactory } from '@/lib/ShopApi'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentShop: null,
        orders: {
            pending: [],
            inProgress: [],
            finished: []
            }
    },
    mutations: {
        updateCurrentShop: (state: any, shop: Shop) => {
            state.currentShop = shop
        },
        updatePending: (state: any, orders: Order[]) => {
            state.orders.pending.splice(0, state.orders.pending.length)
            orders.forEach(v => state.orders.pending.push(v))
        },
        updateInProgress: (state: any, orders: Order[]) => {
            state.orders.inProgress.splice(0, state.orders.inProgress.length)
            orders.forEach(v => state.orders.inProgress.push(v))
        },
        updateFinished: (state: any, orders: Order[]) => {
            state.orders.finished.splice(0, state.orders.finished.length)
            orders.forEach(v => state.orders.finished.push(v))
        }
    },
    actions: {
        async refreshCurrentShop (context: any) {
            const res = await new ShopApiFactory().create().retrieveCurrentShop()
            context.commit('updateCurrentShop', res)
        },
        async refreshPending (context: any) {
            if (context.state.currentShop === null) {
                await context.dispatch('refreshCurrentShop')
            }
            const res = await new OrderApiFactory().create().findPendingOrders(context.state.currentShop.id)
            context.commit('updatePending', res)
        },
        async refreshInProgress (context: any) {
            const res = await new OrderApiFactory().create().findInProgressOrders(context.state.currentShop.id)
            context.commit('updateInProgress', res)
        },
        async refreshFinished (context: any) {
            const res = await new OrderApiFactory().create().findFinishedOrders(context.state.currentShop.id)
            context.commit('updateFinished', res)
        }
    },
    modules: {
    }
})
