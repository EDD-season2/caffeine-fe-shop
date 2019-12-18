import Vue from 'vue'
import Vuex, { ActionContext, Store } from 'vuex'

import { OrderApiFactory } from '@/lib/OrderApi'
import Order from '@/model/Order'
import Shop from '@/model/Shop'
import { ShopApiFactory } from '@/lib/ShopApi'

Vue.use(Vuex)

export interface State {
    currentShop: Shop,
    notifications: string[],
    orders: {
        pending: Order[],
        inProgress: Order[],
        finished: Order[]
    }
}

export default new Vuex.Store({
    state: {
        currentShop: Shop.UNAUTHENTICATED,
        notifications: [],
        orders: {
            pending: [],
            inProgress: [],
            finished: []
            }
    },
    mutations: {
        updateCurrentShop: (state: State, shop: Shop) => {
            state.currentShop = shop
        },
        updatePending: (state: State, orders: Order[]) => {
            state.orders.pending.splice(0, state.orders.pending.length)
            orders.forEach(v => state.orders.pending.push(v))
        },
        updateInProgress: (state: State, orders: Order[]) => {
            state.orders.inProgress.splice(0, state.orders.inProgress.length)
            orders.forEach(v => state.orders.inProgress.push(v))
        },
        updateFinished: (state: State, orders: Order[]) => {
            state.orders.finished.splice(0, state.orders.finished.length)
            orders.forEach(v => state.orders.finished.push(v))
        },
        addNotification: (state: State, message: string) => {
            state.notifications.push(message)
            if (state.notifications.length > 100) {
                state.notifications.splice(100, state.notifications.length - 100)
            }
        }
    },
    actions: {
        async refreshCurrentShop (context: ActionContext<State, State>) {
            const res = await new ShopApiFactory().create().retrieveCurrentShop()
            context.commit('updateCurrentShop', res)
        },
        async refreshPending (context: ActionContext<State, State>) {
            if (!canRetrieveOrders(context)) {
                return null
            }
            await context.dispatch('refreshCurrentShop')
            const res = await new OrderApiFactory().create().findPendingOrders(context.state.currentShop.id)
            context.commit('updatePending', res)
        },
        async refreshInProgress (context: ActionContext<State, State>) {
            const res = await new OrderApiFactory().create().findInProgressOrders(context.state.currentShop.id)
            context.commit('updateInProgress', res)
        },
        async refreshFinished (context: ActionContext<State, State>) {
            const res = await new OrderApiFactory().create().findFinishedOrders(context.state.currentShop.id)
            context.commit('updateFinished', res)
        },
        async receiveNotification (context: ActionContext<State, State>, notification: string) {
            context.commit('addNotification', notification)
        }
    },
    modules: {
    }
})

function canRetrieveOrders (context: any) {
    return context.state.currentShop !== Shop.UNAUTHENTICATED
}
