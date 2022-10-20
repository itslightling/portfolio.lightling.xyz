<template lang='pug'>
.video-embed.embed
  .element
    .video.object
      iframe(
        :src='src'
        frameborder='0'
        allow='fullscreen'
        allowfullscreen
      )
    .description
      p(
        v-html='video.description'
      )
</template>

<style lang='sass' scoped>
@import '@/styles/variables.sass'
@import 'styles/shared/embed.sass'

.video-embed
  .video
    height: 16rem
    iframe
      height: 100%
      width: 100%
      display: block
      margin: auto
      border-radius: 1rem
</style>

<script lang='ts'>
import { defineComponent, computed } from 'vue'
import { DetailedVideoElement } from '@/types/DetailedVideoElement'

export default defineComponent({
  name: 'VideoEmbed',
  props: {
    video: {
      type: Object as () => DetailedVideoElement,
      required: true,
    },
  },
  setup (props: any) {
    const video = props.video as DetailedVideoElement
    const src = computed(() => {
      switch (video.type) {
        case 'vimeo':
          return `https://player.vimeo.com/video/${video.src}`
        case 'youtube':
          return `https://www.youtube.com/embed/${video.src}`
        default:
          return video.src
      }
    })

    return {
      src,
    }
  },
})
</script>
