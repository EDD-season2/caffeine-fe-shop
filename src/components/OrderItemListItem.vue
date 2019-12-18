<template>
<v-list-item>
    <v-list-item-content>
        <span class="subtitle-1">{{ orderItem.name }}</span>
    </v-list-item-content>
    <!-- <v-row class="justify-space-around py-2 px-3">
        <span class="subtitle-1">{{ orderItem.name }}</span>
    </v-row> -->
    <!-- <v-divider class="my-3"/> -->
</v-list-item>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

import MenuItem from '../model/MenuItem'
import OrderItem from '../model/OrderItem'
import { MenuItemApiFactory } from '../lib/MenuItemApi'

@Component
export default class OrderItemListItem extends Vue {
    @Prop() private orderItem!: MenuItem;

    private async beforeMount () {
        const menuItem = await new MenuItemApiFactory().create().findById(this.orderItem.id)
    }
}
</script>
