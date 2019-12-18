<template>
<v-list-item>
    <router-link :to="url" class="link">
        <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item-content>
    </router-link>
</v-list-item>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import MenuItem from '../model/MenuItem'

@Component
export default class MenuItemListItem extends Vue {
    @Prop() private item!: MenuItem
    private url = ''

    private beforeMount () {
        const shopId = this.$route.params
        this.url = `/shop/${shopId}/menu/${this.item.id}`
    }
}
</script>

<style lang="scss" scoped>
.link {
    text-decoration: none;
    color: black;
}
</style>
