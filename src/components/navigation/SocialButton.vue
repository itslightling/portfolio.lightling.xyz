<template lang='pug'>
a(
  v-if='link',
  :href='link',
  :title='title',
)
  SocialButtonContent(
    :title='title',
    :image-src='imageSrc',
    :is-wide='isWide',
  )
div(
  v-else='',
)
  SocialButtonContent(
    :title='title',
    :image-src='imageSrc',
    :is-wide='isWide',
  )
</template>

<style lang='sass' scoped>
@import '@/styles/variables.sass'

a
  &:hover
    outline-color: transparentize($brand-dark-a, 0.8)
  &:active
    transform: scale(1.05)
  &::after
    display: none
</style>

<script lang='ts'>
import {
  defineComponent,
} from 'vue'

import SocialButtonContent from '@/components/navigation/SocialButtonContent.vue'

export default defineComponent({
  name: 'SocialButton',
  components: {
    SocialButtonContent,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      default: null,
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
