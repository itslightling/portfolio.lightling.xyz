<template lang='pug'>
section(
  id='featured',
)
  h2 Featured
  div
    div(
      v-for='project in featured',
      :key='project.name',
    )
      ProjectEmbed(
        :project='project',
      )
</template>

<style lang='sass' scoped>
@import '@/styles/variables.sass'

#featured
  margin: $header-lower-size auto calc($header-upper-size + $header-lower-size)
  width: 80vw
  h2
    margin-bottom: 1.5rem
  &>div
    border-radius: 1rem
    height: auto
    display: grid
    grid-template-columns: repeat(4, 1fr)
    padding: 2rem
    grid-gap: 2rem
    background-color: $brand-light-a

@media screen and (orientation: portrait)
  #featured
    &>div
      grid-template-columns: repeat(2, 1fr)

@media screen and (max-width: 960px)
  #featured
    width: 95vw

@media screen and (max-width: 500px)
  #featured
    &>div
      grid-template-columns: repeat(1, 1fr)

@media screen and (max-width: 420px)
  #featured
    width: 99vw
</style>

<script lang='ts'>
import {
  defineComponent,
} from 'vue'
import ProjectEmbed from '@/components/embeds/ProjectEmbed.vue'
import { ProjectFeaturedDetails } from '@/types/project/ProjectFeaturedDetails'

export default defineComponent({
  name: 'Featured',
  components: {
    ProjectEmbed,
  },
  props: {
    featured: {
      type: Object as () => ProjectFeaturedDetails,
      required: true,
    }
  }
})
</script>
