<template lang='pug'>
div(
  class='gallery',
)
  img(
    v-for='(image, index) of images',
    :key='`galEl${index}`',
    :src='image.src',
    :alt='image.alt',
    :title='image.title !== undefined ? image.title : image.alt',
  )
</template>

<style lang='sass' scoped>
@import '@/styles/variables.sass'

.gallery
  width: calc(100% - 2rem)
  margin: 1rem
  column-count: 4
  column-gap: 0
  img
    width: calc(100% - 1rem) !important
    height: auto !important
    margin: 0.25rem
    border: 0.15rem solid $brand-dark-a
    border-radius: 1rem

@media screen and (max-aspect-ratio: 5/4)
  .gallery
    column-count: 3

@media screen and (max-aspect-ratio: 4/5)
  .gallery
    column-count: 2
</style>

<script lang='ts'>
import {
  defineComponent,
} from 'vue'

export default defineComponent({
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
})
</script>
