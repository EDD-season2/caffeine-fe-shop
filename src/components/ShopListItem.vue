<template>
    <li>{{ itemProp.name }}</li>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import Shop from '../model/Shop'

@Component
export default class ShopListItem extends Vue {
    @Prop() private itemProp!: Shop

    constructor () {
        super()

        console.log(this.itemProp)
    }
}
</script>
