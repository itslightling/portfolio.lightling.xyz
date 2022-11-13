<template lang='pug'>
section(
  id='motto',
)
  h2 Motto
  div
    div
      p(
        v-for='(p, i) in motto',
        :key='`motto_${i}`',
        v-html='p',
      )
    div
      div(
        class='avatar',
      )
        img(
          :src='logo.src',
          :alt='logo.alt',
        )
      p Lightling
</template>

<style lang='sass' scoped>
@import '@/styles/variables.sass'

#motto
  width: 100vw
  margin: calc(($header-upper-size + $header-lower-size) / 2) auto
  position: relative
  background-color: $brand-bright-a
  h2
    display: none
  &::before,
  &::after
    content: ''
    z-index: -1
    background-image: url(/content/images/site/landing-border.svg)
    background-origin: border-box
    background-size: 33vw auto
    background-repeat: repeat-x
    display: block
    position: absolute
    width: 100%
    height: 12rem
    padding: 0
    margin: 0
    line-height: 0
  &::before
    top: -3rem
    animation: slide 9s linear infinite
  &::after
    bottom: -3rem
    transform: scaleY(-1)
    animation: slide 9s linear infinite reverse
  &>div
    display: flex
    justify-content: center
    align-items: center
    text-align: center
    color: $brand-dark-b
    padding: 0 10vw
    &>div
      flex: 0 0 50%
    &>div:nth-of-type(1)
      font-family: $heading-family
      p:nth-of-type(1)
        font-size: 3.5rem
      p:nth-of-type(2)
        font-size: 2.75rem
    &>div:nth-of-type(2)
      .avatar
        height: 20rem
        width: 20rem
        margin: auto
        img
          width: 100%
          height: 100%
      p
        font-style: italic
        font-size: 1.25rem

@media screen and (orientation: portrait)
  #motto
    &>div
      padding: 0 1rem

@media screen and (max-width: 960px)
  #motto
    &::before
      top: -2rem
    &::after
      bottom: -2rem

@media screen and (max-width: 640px)
  #motto
    &::before
      top: -1rem
    &::after
      bottom: -1rem
    &>div
      &>div:nth-of-type(1)
        flex: 1 1 auto
        p:nth-of-type(1)
          font-size: 2rem
        p:nth-of-type(2)
          font-size: 1.5rem
      &>div:nth-of-type(2)
        flex: 0 0 25%
        .avatar
          width: 100%
          height: auto

@media screen and (max-width: 500px)
  #motto
    &::before,
    &::after
      display: none
    &>div
      padding-bottom: 1rem
      &>div:nth-of-type(2)
        display: none
</style>

<script lang='ts'>
import { defineComponent } from 'vue'

import { ImageElement } from '@/types/ImageElement'

export default defineComponent({
  name: 'Motto',
  props: {
    motto: {
      type: Array<string>,
      required: true,
    },
    logo: {
      type: Object as () => ImageElement,
      required: true,
    },
  },
})
</script>
