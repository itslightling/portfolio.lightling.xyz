<template lang='pug'>
div
  HeaderNav
  main
    router-view
</template>

<style scoped lang='sass'>

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
