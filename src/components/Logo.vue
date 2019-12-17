<template>
<v-app-bar
    tabs
    flat
    dark
    shrink-on-scroll>
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
            // TODO: move to edit page
            return
        }
        if (index === 1) {
            // TODO: logout
        }
    }
}
</script>

<style lang="scss" scoped>
.link {
    margin: 0;
    text-decoration: none;
}

.logo-title {
    color: #746060;
    font-family: 'Segoe UI';
    text-align: center
}
</style>
