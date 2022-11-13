<template lang='pug'>
.checkbox
  input(
    :id='name',
    :name='name',
    type='checkbox',
    checked,
    @change='$emit("changed", $event.target.checked)',
  )
  label(
    :for='name',
  ) {{ label }}
</template>

<style lang='sass' scoped>
@import '@/styles/variables.sass'

.checkbox
  display: flex
  width: 100%
  align-items: center
  *
    cursor: pointer
  input
    appearance: none
    position: relative
    width: 3rem
    height: 3rem
    flex: 0 0 3rem
    margin-right: 0.25rem
    border: 0.25rem solid $brand-dark-b
    outline: 0.25rem solid transparent
    border-radius: 0.5rem
    transition: outline $brand-anim-a
    &:focus
      outline-color: $brand-dark-a
    &:hover
      outline-color: transparentize($brand-dark-a, 0.5)
    &:active
      outline-width: 0.5rem
    &::before
      content: ''
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      background-color: transparent
      background-size: 100% 100%
      background-position: center center
      background-repeat: no-repeat
      margin: 0.25rem
      border-radius: 0.5rem
      transition: all $brand-anim-a
    &:checked::before
      background-image: url('/content/images/site/checkmark.svg')
      background-size: 70% 70%
      background-color: $brand-dark-b
</style>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
})
</script>
