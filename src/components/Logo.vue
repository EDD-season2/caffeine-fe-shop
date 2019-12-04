<template>
<div class="my-3">
    <h1 class="headline logo-title mt-3">
      <router-link to="/" v-if="showHome">
        <v-icon class="ic-home">mdi-home-outline</v-icon></router-link>
        CAFFEINE
    </h1>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component
export default class Logo extends Vue {
  @Prop({ default: true }) private showHome?: boolean
}
</script>

<style lang="scss" scoped>
div {
  position: relative;
}

.ic-home {
  position: absolute;
  left: 16px;
  top: 4px;
}

.logo-title {
    color: #746060;
    font-family: 'Segoe UI';
    text-align: center
}
</style>
