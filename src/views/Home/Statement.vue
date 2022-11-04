<template lang='pug'>
section(
  id='statement',
)
  h2 Statement
  .photo
    img(
      :src='photo.src',
      :alt='photo.alt',
    )
  section(
    id='about',
  )
    h3 About
    p(
      v-for='(p, i) in statement',
      :key='`statement_${i}`',
      v-html='p',
    )
</template>

<style lang='sass' scoped>
@import '@/styles/variables.sass'

#statement
  display: flex
  width: 70vw
  margin: auto
  align-items: center
  &>h2
    display: none
  .photo
    z-index: 1
    flex: 0 0 auto
    width: 20rem
    height: 20rem
    position: relative
    &::before
      content: ''
      background-image: url(/images/misc/pride.svg)
      background-size: cover
      background-position: center center
      position: absolute
      z-index: -1
      top: -1rem
      left: -1rem
      right: -1rem
      bottom: -1rem
      border-radius: 50%
    img
      height: 100%
      width: 100%
      border-radius: 50%
  section
    border-radius: 1rem
    position: relative
    width: 100%
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    background-color: $brand-light-a
    padding: 10%
    margin: calc(($header-upper-size + $header-lower-size) / 2) auto
    &::before
      content: ''
      border-radius: 1rem
      background-color: $brand-light-a
      position: absolute
      top: 0
      bottom: 0
      left: -10rem
      right: 0
      z-index: -1
    p
      font-size: 1.5rem
      max-width: 36rem

@media screen and (max-aspect-ratio: 6/5)
  #statement
    width: 95vw

@media screen and (max-width: 800px)
  #statement
    .photo
      width: 10rem
      height: 10rem
    section
      &::before
        left: -5rem

@media screen and (max-width: 640px)
  #statement
    section
      p
        font-size: 1rem

@media screen and (max-width: 460px)
  #statement
    .photo
      width: 6rem
      height: 6rem
      &::before
        top: -0.5rem
        left: -0.5rem
        right: -0.5rem
        bottom: -0.5rem
    section
      &::before
        left: -6rem
</style>

<script lang='ts'>
import { defineComponent } from 'vue'

import { ImageElement } from '@/types/ImageElement'

export default defineComponent({
  name: 'Statement',
  props: {
    photo: {
      type: Object as () => ImageElement,
      required: true,
    },
    statement: {
      type: Array<string>,
      required: true,
    },
  },
})
</script>
