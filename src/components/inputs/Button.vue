<template lang='pug'>
button(
  class='button'
  @click='$emit("clicked")'
)
  div
    span {{ text }}
</template>

<style lang='sass' scoped>
@import '@/styles/variables.sass'

button
  cursor: pointer
  background-color: $brand-light-a
  border-radius: 0.5rem
  position: relative
  z-index: 5
  padding: 0
  border: 0.25rem solid $brand-dark-b
  outline: 0.25rem solid transparent !important
  transition: outline $brand-anim-a
  &:focus
    outline-color: $brand-dark-a !important
  &:hover
    outline-color: transparentize($brand-dark-a, 0.5) !important
  &:active
    outline-width: 0.5rem !important
  div
    color: $brand-light-a
    background-color: $brand-dark-b
    border-radius: 0.5rem
    margin: 0.25rem
    padding: 0.5rem
    height: calc(100% - 1.5rem)
    display: flex
    align-items: center
    justify-content: center
</style>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    text: {
      type: String,
      required: true,
    },
  },
})
</script>
