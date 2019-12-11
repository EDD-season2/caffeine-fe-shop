<template>
<h2 class="title text-center">{{ text }}</h2>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component
export default class Subtitle extends Vue {
    @Prop() private text!: string;
}
</script>

<style lang="scss" scoped>
h2 {
    font-size: 14pt;
}
</style>
