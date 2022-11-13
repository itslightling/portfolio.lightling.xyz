<template lang='pug'>
.code-embed
  .heading
    Button(
      :text='isOpen ? "▲" : "▼"',
      @click='() => onToggle(!isOpen)',
    )
    span {{ snippet.title }}
  .content(
    :class='{ open: isOpen }',
  )
    p(
      v-for='(desc, i) in snippet.description',
      :key='`snippet_${i}`',
      v-html='desc',
    )
    pre(
      v-hljs,
    )
      code(
        :class='`${snippet.language} language-${snippet.language}`',
        v-html='snippet.code',
      )
</template>

<style lang='sass' scoped>
@import '@/styles/variables.sass'

.code-embed
  margin: 1rem 0 0
  max-width: 100%
  border: 0.25rem solid $brand-dark-a
  border-radius: 1rem
  padding: 0.25rem

.heading
  &>span
    margin-left: 0.5rem
    font-family: monospace
    font-size: 1.25rem

.content
  min-height: 0
  max-height: 0
  overflow: hidden
  max-width: 100%
  transition: max-height $brand-anim-a
  &.open
    height: auto
    min-height: 16rem
    max-height: 100vh

pre
  border-radius: 1rem
  height: 16rem
  overflow: auto
  background-color: white
  padding: 1rem
  code.hljs
    display: block
    padding: 0
    background-color: transparent
    overflow-x: unset
</style>

<script lang='ts'>
import { defineComponent, ref } from 'vue'

import Button from '@/components/inputs/Button.vue'
import { CodeSnippet } from 'types/CodeSnippet'

export default defineComponent({
  components: {
    Button,
  },
  props: {
    snippet: {
      type: Object as () => CodeSnippet,
      required: true,
    },
  },
  setup () {
    const isOpen = ref(false)

    return {
      isOpen,
    }
  },
  methods: {
    onToggle (visibility: boolean) {
      this.isOpen = visibility
    },
  },
})
</script>
