<template lang='pug'>
.image-embed.embed
  .element
    .image.object
      Tippy(
        :content='image.title || image.alt',
      )
        img(
          :src='image.src',
          :alt='image.alt',
          :tabindex='preview ? -1 : 0',
          @click='() => onToggle(true)',
          @keyup.enter='() => onToggle(true)',
          @keyup.space='() => onToggle(true)',
        )
    .description
      p(
        v-html='image.shortDescription',
      )
  .preview(
    v-if='preview',
  )
    .image
      Tippy(
        :content='image.title || image.alt',
      )
        img(
          :src='image.src',
          :alt='image.alt',
          :tabindex='preview ? -1 : 0',
          @click='() => onToggle(true)',
          @keyup.enter='() => onToggle(true)',
          @keyup.space='() => onToggle(true)',
        )
    .description
      p(
        v-html='image.longDescription || image.shortDescription',
      )
      Button(
        v-focus='',
        tabindex='2',
        text='Close',
        @click='() => onToggle(false)',
      )
</template>

<style lang='sass' scoped>
@import '@/styles/variables.sass'
@import '@/styles/shared/embed.sass'

.element::v-deep
  .image
    height: 10rem
    cursor: pointer
    display: flex
    align-items: center
    justify-content: center
    &>div
      height: 100%
      &>div:nth-of-type(2)
        height: 100%
        display: flex
    img
      height: auto
      width: auto
      max-height: 100%
      max-width: 100%
      display: block
      margin: auto
      border-radius: 1rem
      outline: 0.25rem solid transparent
      transition: outline $brand-anim-a
      &:focus
        outline-color: $brand-dark-a
.preview::v-deep
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0
  z-index: 99
  background-color: #000a
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  grid-gap: 1rem
  animation: openScale $brand-anim-a
  &::before
    content: ''
    position: absolute
    background-color: $brand-dark-a
    top: 6rem
    left: 6rem
    bottom: 6rem
    right: 6rem
    z-index: -1
    border-radius: 1rem
  .image
    max-height: 60vh
    &>div:nth-of-type(1)
      height: 100%
      &>div:nth-of-type(2)
        height: 100%
    img
      height: 100%
      width: auto
      display: block
      margin: auto
  .description
    display: flex
    justify-content: center
    align-items: center
    grid-gap: 2rem
    color: $brand-light-a
    font-size: 1.5rem
    max-width: 42rem
  button
    &:focus
      outline-color: $brand-bright-a !important
</style>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import { Tippy } from 'vue-tippy'
import { DetailedImageElement } from '@/types/DetailedImageElement'
import Button from '@/components/inputs/Button.vue'

export default defineComponent({
  name: 'ImageEmbed',
  components: {
    Button,
    Tippy,
  },
  props: {
    image: {
      type: Object as () => DetailedImageElement,
      required: true,
    },
  },
  setup () {
    const preview = ref(false)

    return {
      preview,
    }
  },
  methods: {
    onToggle (visibility: boolean) {
      this.preview = visibility
    },
  },
})
</script>
