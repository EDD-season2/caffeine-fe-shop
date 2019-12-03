<template>
  <div>
    <router-link to="/register">매장 등록</router-link>
    <ShopList :itemProps="shops"/>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'
import ShopList from '@/components/ShopList.vue'
import ShopListItemProp from '@/components/ShopListItem.vue'
import Component from 'vue-class-component'

@Component({
    components: {
        HelloWorld,
        ShopList
    }
})
export default class Home extends Vue {
    private shops?: ShopListItemProp[]

    constructor () {
      super()

      this.shops = [
        { id: 1, name: '스타벅스 잠실점' },
        { id: 2, name: '스타벅스 송파구청점' }
      ]
    }
}
</script>
