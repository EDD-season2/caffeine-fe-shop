<template>
<v-app-bar
    tabs
    flat
    dark
    prominent>
    <v-btn
        v-show="showHome"
        @click="moveHome"
        icon
        text>
        <v-icon>mdi-home-outline</v-icon>
    </v-btn>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu
        offset-y
        absolute>
        <template v-slot:activator="{on}">
            <v-btn
                icon
                v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </template>
        <v-list>
            <v-list-item
                v-for="(item, index) in menus"
                :key="index"
                @click="onMenuClick(index)">
                <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
    <template v-slot:extension>
        <slot name="extension"></slot>
    </template>
</v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

import { OwnerApiFactory } from '@/lib/OwnerApi'

@Component
export default class Logo extends Vue {
    @Prop({ default: true }) private showHome?: boolean
    @Prop({ default: '' }) private title?: string
    private menus = [
        '정보 수정',
        '로그아웃'
    ];

    private moveHome () {
        this.$router.push('/')
    }

    private onMenuClick (index: number) {
        if (index === 0) {
            this.$router.push('/info')
            return
        }
        if (index === 1) {
            OwnerApiFactory.create().logout()
            .then(message => {
                if (status === 'ok') {
                    this.$store.dispatch('receiveNotification', '로그아웃됐습니다')
                    this.$router.push('/login')
                    return
                }
                this.$store.dispatch('receiveNotification', '로그아웃에 실패했습니다')
                this.$router.push('/login')
            })
        }
    }
}
</script>
