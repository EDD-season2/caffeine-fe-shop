import Vue from 'vue'
import Vuex from 'vuex'

import { OrderApiFactory } from '@/lib/OrderApi'
import Order from '@/model/Order'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentShopId: 110,
    orders: {
      pending: [],
      inProgress: [],
      finished: []
    }
  },
  mutations: {
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
    async refreshPending (context: any) {
      const res = await new OrderApiFactory().create().findPendingOrders(context.state.currentShopId)
      context.commit('updatePending', res)
    },
    async refreshInProgress (context: any) {
      const res = await new OrderApiFactory().create().findInProgressOrders(context.state.currentShopId)
      context.commit('updateInProgress', res)
    },
    async refreshFinished (context: any) {
      const res = await new OrderApiFactory().create().findFinishedOrders(context.state.currentShopId)
      context.commit('updateFinished', res)
    }
  },
  modules: {
  }
})
