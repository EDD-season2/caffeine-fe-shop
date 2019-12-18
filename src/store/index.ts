import Vue from 'vue'
import Vuex, { ActionContext } from 'vuex'

import { OrderApiFactory } from '@/lib/OrderApi'
import Order from '@/model/Order'
import Shop from '@/model/Shop'
import Owner from '@/model/Owner'
import { OwnerApiFactory } from '@/lib/OwnerApi'

Vue.use(Vuex)

export interface State {
    currentOwner: Owner,
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
        currentOwner: Owner.UNAUTHENTICATED,
        currentShop: Shop.UNAUTHENTICATED,
        notifications: [],
        orders: {
            pending: [],
            inProgress: [],
            finished: []
            }
    },
    mutations: {
        updateCurrentOwner: (state: State, owner: Owner) => {
            state.currentOwner = owner
            state.currentShop = owner.shops[0]
        },
        selectShop: (state: State, index: number) => {
            state.currentShop = state.currentOwner.shops[index]
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
        async refreshCurrentOwner (context: ActionContext<State, State>) {
            const res = await OwnerApiFactory.create().retrieveCurrentOwner()
            context.commit('updateCurrentOwner', res)
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

function canRetrieveOrders (context: ActionContext<State, State>) {
    return context.state.currentOwner !== Owner.UNAUTHENTICATED
}
