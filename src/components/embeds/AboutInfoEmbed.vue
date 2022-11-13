<template lang='pug'>
section(
  :id='id',
)
  h2 {{ heading }}
  div
    .image
      img(
        :src='imageSrc',
        :alt='imageAlt',
        :title='imageAlt',
      )
    .body
      p(
        v-for='(content, index) in body',
        :key='"infoBody_" + index',
        v-html='content',
      )
</template>

<style lang='sass' scoped>
@import '@/styles/variables.sass'

section
  h2
    font-size: 2.25rem
    margin-bottom: 1rem
    font-weight: bold
    border: 1px solid lighten($brand-dark-a, 15%)
    border-left: none
    border-right: none
    padding: 0.5rem 0 0.75rem
  &>div
    display: flex
    .image
      flex: 1 0 33%
      display: grid
      padding-right: 1rem
      border-right: 1px dotted lighten($brand-dark-a, 15%)
      img
        width: 100%
        height: auto
        margin: auto
        border-radius: 1rem
    .body
      flex: 1 1 auto
      max-width: 28rem
      font-size: 1.25rem
      align-self: center
      background-color: $brand-medium-a
      border-radius: 1rem
      padding: 1rem
      margin-left: 1rem
      p
        margin: 1.25rem 0 0
        &:nth-of-type(1)
          margin-top: 0

@media screen and (max-width: 600px)
  section
    &>div
      .body
        font-size: 0.8rem

@media screen and (max-width: 450px)
  section
    &>div
      .image
        display: none
      .body
        margin-left: 0
</style>

<script lang='ts'>
import {
  defineComponent,
} from 'vue'

export default defineComponent({
  name: 'AboutInfoEmbed',
  props: {
    id: {
      type: String,
      required: true,
    },
    heading: {
      type: String,
      required: true,
    },
    body: {
      type: Array,
      required: true,
    },
    imageSrc: {
      type: String,
      required: true,
    },
    imageAlt: {
      type: String,
      required: true,
    },
  },
})
</script>
