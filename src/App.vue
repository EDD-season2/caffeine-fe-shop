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

import RequestWrapper from './lib/RequestWrapper'
import Shop from './model/Shop'
import { State } from './store'
import Owner from './model/Owner'

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
            }
        })
        this.subscribe()
    }

    private subscribe () {
        if (this.canSubscribe()) {
            this.eventSource = RequestWrapper.subscribe(`/v1/subscribe/shops/${this.$store.state.currentShop.id}`)
            this.eventSource.onmessage = (evt) => {
                this.handleNotify(evt.data)
                this.$store.dispatch('refreshPending')
            }
            this.eventSource.onerror = () => {
                this.subscribe()
            }
        }
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
