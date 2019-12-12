import Vue from 'vue'
import Vuex from 'vuex'

import OrderResponse from '@/lib/OrderResponse'
import { OrderApiFactory } from '@/lib/OrderApi'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentShopId: 102,
    orders: {
      pending: [],
      inProgress: [],
      finished: []
    }
  },
  mutations: {
    updatePending: (state: any, orders: OrderResponse[]) => {
      console.log(state)
      state.orders.pending.splice(0, state.pending.length)
      orders.forEach(v => state.orders.pendings.push(v))
    }
  },
  actions: {
    async refreshPending (context: any) {
      console.log(context.state)
      const res = await new OrderApiFactory().create().findPendingOrders(context.state.currentShopId)
      context.commit('updatePending', res)
    }
  },
  modules: {
  }
})
