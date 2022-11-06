<template lang='pug'>
div(
  :class='isWide ? "social-button wide" : "social-button"',
)
  img(
    :src='imageSrc',
    alt=''
    role='presentation',
  )
  p
    | {{ title }}
</template>

<style lang='sass' scoped>
@import '@/styles/variables.sass'

.social-button
  display: flex
  flex-direction: column
  align-items: center
  grid-gap: 0
  text-align: center
  white-space: normal
  &.wide
    word-break: break-word
    flex-direction: row
    grid-gap: 2rem
    text-align: left
  img
    height: auto
    width: 100%
    box-shadow: 0 2px 2px 0 transparentize($brand-dark-b, 0.5)
    border-radius: 50%

.wide
  img
    height: 100%
    width: auto
</style>

<script lang='ts'>
import {
  defineComponent,
} from 'vue'

export default defineComponent({
  name: 'SocialButtonContent',
  props: {
    title: {
      type: String,
      required: true,
    },
    imageSrc: {
      type: String,
      default: null,
    },
    isWide: {
      type: Boolean,
      default: false,
    },
  },
  setup () {

  },
})
</script>
