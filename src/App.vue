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
          @click="showSnackbar = false"
        >
          Close
        </v-btn>
    </v-snackbar>
</v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import RequestWrapper from './lib/RequestWrapper'

@Component
export default class App extends Vue {
    private showSnackbar = false;
    private snackbarText = '';

    private eventSource?: EventSource;

    private beforeMount () {
        this.subscribe()
    }

    private subscribe () {
        // TODO: change shop id later
        this.eventSource = RequestWrapper.subscribe('/v1/subscribe/shops/102')
        this.eventSource.onmessage = (evt) => {
            this.handleNotify(evt.data)
            this.$store.dispatch('refreshPending')
        }
        this.eventSource.onerror = () => {
            this.subscribe()
        }
    }

    private handleNotify (message: string) {
        if (message !== 'ok') {
            this.snackbarText = message
            this.showSnackbar = true
        }
    }
}
</script>
