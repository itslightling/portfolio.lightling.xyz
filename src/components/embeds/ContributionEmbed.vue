<template lang='pug'>
p(
  v-if="type === 'para'",
  v-html='content',
)
li(
  v-else-if='content.label === undefined',
  v-html='content',
)
li(
  v-else-if="type !== 'section' && level > 0",
)
  span(
    v-html='content.label',
  )
  ul
    ContributionEmbed(
      v-for='(c, i) in content.list',
      :key='`contribution_${level + 1}_${i}`',
      :content='c', :level='level + 1',
      type='any',
    )
section(
  v-else,
)
  h3(
    v-if='level === 0',
  ) {{ content.label }}
  h4(
    v-else-if='level === 1',
  ) {{ content.label }}
  h5(
    v-else-if='level === 2',
  ) {{ content.label }}
  h6(
    v-else-if='level === 3',
  ) {{ content.label }}
  div(
    v-if='content.list[0].isPara !== undefined',
  )
    ContributionEmbed(
      v-for='(c, i) in content.list',
      :key='`contribution_${level + 1}_${i}`',
      :content='c.content', :level='level + 1',
      type='para',
    )
  ul(
    v-else-if='content.list[0].label === undefined',
  )
    ContributionEmbed(
      v-for='(c, i) in content.list',
      :key='`contribution_${level + 1}_${i}`',
      :content='c',
      :level='level + 1',
      type='any',
    )
  div(
    v-else,
  )
    ContributionEmbed(
      v-for='(c, i) in content.list',
      :key='`contribution_${level + 1}_${i}`',
      :content='c', :level='level + 1',
      type='section',
    )
</template>

<style lang='sass' scoped>
ul
  padding-left: 0.5rem
  margin: 0
  & li>ul
    padding-left: 1rem
</style>

<script lang='ts'>
import {
  defineComponent,
} from 'vue'

export default defineComponent({
  name: 'ContributionEmbed',
  props: {
    content: {
      type: Object || String,
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
})
</script>
