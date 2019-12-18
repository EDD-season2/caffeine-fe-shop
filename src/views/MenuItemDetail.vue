<template>
<div>
    <Logo
        title="메뉴 상세">
        <template v-slot:extension>
            <v-btn
                @click="onEditClick"
                fab
                absolute
                right
                bottom>
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
        </template>
    </Logo>
    <v-sheet class="px-3 py-3">
        <v-subheader>메뉴명</v-subheader>
        <v-card-text class="title ml-3">{{ menuItem.name }}</v-card-text>
        <v-subheader>설명</v-subheader>
        <v-card-text class="title ml-3">{{ menuItem.description }}</v-card-text>
        <v-subheader>가격</v-subheader>
        <v-card-text class="title ml-3">{{ menuItem.price }}</v-card-text>
    </v-sheet>
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
    private menuItem = MenuItem.INVALID;

    private created () {
        const menuItemId = Number(this.$route.params.menuItemId)
        new MenuItemApiFactory().create().findById(menuItemId)
        .then(menuItem => {
            this.menuItem = menuItem
        })
    }

    private onEditClick () {
        this.$router.push(`/menu/edit/${this.menuItem.id}`)
    }
}
</script>
