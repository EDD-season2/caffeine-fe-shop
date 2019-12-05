<template>
<router-link :to="`/order/${orderId}`">
    <v-list-item>
        <v-list-item-content>
            <v-list-item-title>
                {{ orderText }}
            </v-list-item-title>
        </v-list-item-content>
    </v-list-item>
</router-link>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component
export default class PendigOrderListItem extends Vue {
    @Prop() private orderText!: string;
    @Prop() private orderId!: number;
}
</script>
