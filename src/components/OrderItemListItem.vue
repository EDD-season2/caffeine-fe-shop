<template>
<div>
    <v-row class="justify-space-around py-2 px-3">
        <span class="subtitle-1">{{ orderedMenu.name }}</span>
        <span>수량 {{ orderItem.quantity }}</span>
    </v-row>
    <v-divider class="my-3"/>
</div>
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
    @Prop() private orderItem!: OrderItem;
    private orderedMenu: MenuItem = new MenuItem(0, '', '', 0);

    private beforeMount () {
        new MenuItemApiFactory().create().findById(this.orderItem.id)
        .then(menu => { this.orderedMenu = new MenuItem(menu.id, menu.name, menu.description, menu.price) })
    }
}
</script>
