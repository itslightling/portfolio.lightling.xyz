<template lang='pug'>
iframe(
  style='border: 0;'
  :src='src'
  seamless
)
  a(
    :href='href'
  )
    =title
</template>

<style lang='sass' scoped>
iframe::v-deep
  max-width: 700px
  width: calc(100% - 2rem)
  height: 24rem
  margin: 1rem
  border-radius: 1rem
</style>

<script lang='ts'>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  props: {
    href: {
      type: String,
      required: true,
    },
    albumId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  setup (props: any) {
    const src = computed(() => {
      return `https://bandcamp.com/EmbeddedPlayer` +
        `/album=${props.albumId}` +
        `/size=large/bgcol=ffffff/linkcol=351431` +
        `/artwork=small/transparent=true/`
    })

    return {
      src,
    }
  },
})
</script>
