<template>
    <li>{{ itemProp.name }}</li>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

export interface ShopListItemProp {
    id: number
    name: string
}

@Component
export default class ShopListItem extends Vue {
    @Prop() private itemProp!: ShopListItemProp

    constructor () {
        super()

        console.log(this.itemProp)
    }
}
</script>
