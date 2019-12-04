<template>
<div>
    <Logo/>
    {{ menuItemName }}
    {{ menuItemDescription }}
    {{ menuItemPrice }}
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

import Logo from '@/components/Logo.vue'

import MenuItem from '../model/MenuItem'
import { MenuItemApiFactory } from '../lib/MenuItemApi'

@Component({
    components: {
        Logo
    }
})
export default class MenuItemDetail extends Vue {
    private menuItemId = -1
    private menuItemName = ''
    private menuItemDescription = ''
    private menuItemPrice = 0

    private beforeMount () {
        this.menuItemId = Number(this.$route.params.menuItemId)
        new MenuItemApiFactory().create().findById(this.menuItemId)
        .then(menuItem => {
            this.menuItemName = menuItem.name
            this.menuItemDescription = menuItem.description
            this.menuItemPrice = menuItem.price
        })
    }
}
</script>

<style lang="scss" scoped>
</style>
