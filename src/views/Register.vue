<template>
<div>
    <input type="text" name="shop-name" v-model="shopName">
    <button type="button" @click="onRegisterClick">등록</button>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Register extends Vue {
    private shopName = '';

    private onRegisterClick () {
        const { shopName } = this
        this.shopName = ''
        alert(shopName)
    }
}

</script>
