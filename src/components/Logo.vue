<template>
<v-app-bar
    class="mb-4"
    flat
    dark>
        <v-btn
            @click="moveHome"
            icon
            text>
            <v-icon>mdi-home-outline</v-icon>
        </v-btn>
    <v-toolbar-title>CAFFEINE</v-toolbar-title>
</v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component
export default class Logo extends Vue {
    @Prop({ default: true }) private showHome?: boolean

    private moveHome () {
        this.$router.push('/')
    }
}
</script>

<style lang="scss" scoped>
div {
    position: relative;
}

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
