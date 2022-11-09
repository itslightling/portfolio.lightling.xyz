<template lang='pug'>
#entry
  HeaderNav
  main
    router-view
</template>

<style scoped lang='sass'>
@import '@/styles/variables.sass'

#entry
  main
    height: calc(100vh - $header-upper-size - $header-lower-size)
    margin-top: calc($header-upper-size + $header-lower-size)
</style>

<script lang='ts'>
import { defineComponent } from 'vue'

import HeaderNav from './components/navigation/HeaderNav.vue'

export default defineComponent({
  components: {
    HeaderNav,
  }
})
</script>
