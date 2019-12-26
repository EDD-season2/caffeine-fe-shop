<template>
<v-app>
    <v-content>
        <router-view @notify="handleNotify"/>
    </v-content>
    <v-snackbar
        class="mx-3 mb-2"
        v-model="showSnackbar">
        {{ snackbarText }}
        <v-btn
          color="pink"
          text
          @click="showSnackbar = false">
          Close
        </v-btn>
    </v-snackbar>
</v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import firebase from 'firebase/app'
import 'firebase/messaging'

import RequestWrapper from './lib/RequestWrapper'
import Shop from './model/Shop'
import { State } from './store'
import Owner from './model/Owner'
import { NotificationApiFactory } from './lib/NotificationApi'

@Component
export default class App extends Vue {
    private showSnackbar = false;
    private snackbarText = '';

    private eventSource?: EventSource;

    private created () {
        this.$store.subscribe((mutation, state: State) => {
            this.subscribe()
            if (mutation.type === 'addNotification') {
                this.showSnackbar = true
                this.snackbarText = state.notifications[state.notifications.length - 1]
                this.$store.dispatch('refreshPending')
            }
        })
        if (this.$store.state.currentShop !== Shop.UNAUTHENTICATED) {
            this.subscribe()
        }
    }

    private subscribe () {
        const messaging = firebase.messaging()
        Notification.requestPermission()
            .then((permission: string) => {
                if (permission !== 'granted') {
                alert('알림을 허용해주세요')
                return ''
                }
                return messaging.getToken()
            })
            .then((token: string) => {
                if (token.length === 0) {
                    return
                }
                NotificationApiFactory.create().updateToken(this.$store.state.currentShop.id, token)
                messaging.onTokenRefresh(() => {
                messaging.getToken()
                    .then((token: string) => {
                    NotificationApiFactory.create().updateToken(this.$store.state.currenShop.id, token)
                    })
                })
            })
        firebase.messaging().onMessage(payload => {
            this.$store.dispatch('receiveNotification', payload.data.message)
        })
    }

    private handleNotify (message: string) {
        if (message !== 'ok') {
            this.$store.dispatch('receiveNotification', message)
        }
    }

    private canSubscribe () {
        return !this.eventSource && this.$store.state.currentOwner !== Owner.UNAUTHENTICATED
    }
}
</script>
