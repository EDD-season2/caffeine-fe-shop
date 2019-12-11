<template>
<v-list-item>
    <router-link :to="url" class="link">
        <v-list-item-content>
            <v-list-item-title>{{ itemProp.name }}</v-list-item-title>
        </v-list-item-content>
    </router-link>
</v-list-item>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import Shop from '../model/Shop'

@Component
export default class ShopListItem extends Vue {
    @Prop() private itemProp!: Shop
    private url = '/';

    constructor () {
        super()
        this.url = `/shop/${this.itemProp.id}`
    }
}
</script>

<style lang="scss" scoped>
.item {
    text-align: left;
}

.link {
    color: #ff7f50;
    text-decoration: underline;
}
</style>
