import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import firebase from 'firebase/app'
import 'firebase/messaging'

import vuetify from './plugins/vuetify'
import store from './store'

const firebaseConfig = {
  apiKey: 'AIzaSyDZXTnA3yjOaZQ8JMajcAWiXtXpdoLK1OI',
  authDomain: 'caffeine-fe-shop.firebaseapp.com',
  databaseURL: 'https://caffeine-fe-shop.firebaseio.com',
  projectId: 'caffeine-fe-shop',
  storageBucket: 'caffeine-fe-shop.appspot.com',
  messagingSenderId: '92007077963',
  appId: '1:92007077963:web:495e3cd4ab6e927e4455ce'
}

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()

messaging.usePublicVapidKey('BM1MU-VZ4F2iFFsMoxHKfxm35FTOFVWLSTUTJXtZ4Z-17m66Cdcwsn6jJ7sknIYeQS-OLMCavC_AJUjVMKpFLMw')
Notification.requestPermission()
.then((permission) => {
  if (permission !== 'granted') {
    alert('알림을 허용해주세요')
  }
})
console.log(messaging.getToken())

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
