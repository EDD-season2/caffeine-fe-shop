<template>
<div>
    <Logo :title="title"/>
    <v-card class="mx-3 my-3">
        <v-form class="mx-5 py-3 registration-form" @submit.prevent="onSubmit">
            <v-text-field v-model="menuItemName" class="input-shop-name my-2" label="메뉴 이름"/>
            <v-text-field v-model="menuItemDescription" class="input-shop-name my-2" label="설명"/>
            <v-text-field v-model="menuItemPrice" class="input-shop-name my-2" label="가격"/>
            <v-btn type="submit" elevation="0" color="primary" class="mt-3">확인</v-btn>
        </v-form>
    </v-card>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import Logo from '@/components/Logo.vue'
import { MenuItemApiFactory } from '../lib/MenuItemApi'
import MenuItem from '../model/MenuItem'
import LoginNeededView from './LoginNeededView'

@Component({
    components: {
        Logo
    }
})
export default class MenuRegister extends LoginNeededView {
    private menuItem = MenuItem.INVALID
    private menuItemName: string = ''
    private menuItemDescription: string = ''
    private menuItemPrice: string = ''

    private async created () {
        this.ensureSignedIn()
        this.setModel()
    }

    private get title () {
        if (this.$route.name === 'menuRegister') {
            return '메뉴 등록'
        }
        if (this.$route.name === 'menuEdit') {
            return '메뉴 수정'
        }
    }

    private setModel () {
        if (this.$route.name === 'menuEdit') {
            new MenuItemApiFactory().create().findById(Number(this.$route.params.id))
            .then(menuItem => {
                this.menuItem = menuItem
                this.menuItemName = menuItem.name
                this.menuItemDescription = menuItem.description
                this.menuItemPrice = String(menuItem.price)
            })
        }
    }

    private onSubmit () {
        if (this.$route.name === 'menuEdit') {
            this.updateMenu()
            return
        }
        this.addMenu()
    }

    private addMenu () {
        new MenuItemApiFactory().create().addMenu(
            this.menuItemName,
            this.menuItemDescription,
            Number(this.menuItemPrice),
            this.$store.state.currentShop.id
        )
        .then(menuItem => this.$router.push(`/info`))
    }

    private updateMenu () {
        new MenuItemApiFactory().create().updateById(
            new MenuItem(
                this.menuItem.id,
                this.menuItemName,
                this.menuItem.nameInEnglish,
                this.menuItemDescription,
                Number(this.menuItemPrice),
                this.menuItem.imgUrl,
                this.menuItem.category
            )
        )
        .then(menuItem => this.$router.push(`/info`))
    }
}
</script>
