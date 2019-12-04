<template>
<v-card elevation="1" class="mx-3">
    <template v-for="(item) in menuItems">
        <MenuItemListItem :item="item" v-bind:key="item.id"/>
    </template>
</v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import MenuItem from '../model/MenuItem'
import { Prop } from 'vue-property-decorator'

import MenuItemListItem from '@/components/MenuItemListItem.vue'

@Component({
    components: {
        MenuItemListItem
    }
})
export default class MenuItemList extends Vue {
    @Prop() private menuItems?: MenuItem[]
}
</script>

<style lang="scss" scoped>

</style>
