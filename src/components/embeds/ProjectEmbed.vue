<template lang='pug'>
div(
  :id='project.id',
  :class='`proj-tile ${hidden}`',
)
      a(
        :href='`/portfolio/${project.link.path}`',
        :title='project.link.title',
        @click='routeLink',
      )
        .tile-title
          .thumb-bkgd(
            :style='`background-image: ${project.image}`',
          )
            .title
              p
                | {{ project.formalTitle }}
              p.sm
                | {{
                |   getDate(
                |     project.period[0].start,
                |     &apos;short&apos;,
                |   )
                | }}
                | -
                | {{
                |   getDate(
                |     project.period[project.period.length - 1].end,
                |     &apos;short&apos;,
                |   )
                | }}
      p.desc-note(
        v-if='project.note !== undefined',
      )
        | {{ project.note }}
      ul.desc(
        v-if='project.listedSummary',
      )
        li(
          v-for='(desc, index) in project.listedSummary',
          :key='index',
        )
          span(
            v-html='desc',
          )
      p.desc(
        v-else,
      )
        | {{ project.featuredSummary }}
</template>

<style lang='sass'>
@import '@/styles/variables.sass'

.proj-tile
  margin-bottom: 1rem
  opacity: 1
  pointer-events: unset
  &.hidden
    opacity: 0.25
    pointer-events: none
  a
    display: block
    font-weight: normal
    height: 16rem
    *:not(a):active
      pointer-events: none
    &:after
      display: none
    &:hover
      outline-color: transparentize($brand-dark-a, 0.5)
    .tile-title
      border-radius: 1rem
      height: 100%
      overflow: hidden
      position: relative
      .thumb-bkgd
        height: 100%
        background-position: center center
        background-size: cover
      .title
        position: absolute
        bottom: 0
        color: #fff
        background-color: #000a
        backdrop-filter: blur(8px)
        width: 100%
        text-align: center
        font-size: 1.2rem
        line-height: 1.2rem
        p
          margin: 0
          padding: 0.5rem 0 0
        .sm
          font-size: 0.9rem
          line-height: 0.9rem
          padding-bottom: 0.5rem
  .desc-note
    line-height: 0.9rem
    font-size: 0.9rem
    margin: 0.25rem 0
    font-style: italic
    font-weight: bold
  .desc
    font-size: 1rem
  ul
    padding-left: 1rem

@media screen and (max-width: 600px)
  .proj-tile
    .desc
      font-size: 0.85rem

@media screen and (max-width: 500px)
  .proj-tile
    .desc
      display: none
</style>

<script lang='ts'>
import {
  defineComponent,
  ref,
} from 'vue'
import {
  FilterOperator,
} from '@/types/project/FilterOperator'

import {
  getLocalizedDateString,
} from '@/utilities/Projects'
import {
  ProjectListedDetails,
} from '@/types/project/ProjectListedDetails'
import {
  ProjectFeaturedDetails,
} from '@/types/project/ProjectFeaturedDetails'

export default defineComponent({
  name: 'ProjectEmbed',
  props: {
    project: {
      type: Object as () => ProjectListedDetails | ProjectFeaturedDetails,
      required: true,
    },
    filters: {
      type: Array<string>,
      required: false,
    },
    operator: {
      type: String as Object as () => FilterOperator,
      default: 'OR',
    },
  },
  setup () {
    const thisFilters = ref([])
    const getDate = ref(getLocalizedDateString)

    return {
      thisFilters,
      getDate,
    }
  },
  computed: {
    hidden (): string {
      let isShown = true
      if (!('tags' in this.project) || this.filters === undefined)
        return ''
      switch (this.operator) {
        case 'NAND':
          isShown = this.thisFilters.length === this.thisFilters.filter((filter: string) => {
            return !this.testFilter(
              this.filters || [],
              this.findFilter(this.filters || [], filter),
            )
          }).length
          break
        case 'AND':
          isShown = this.thisFilters.length === this.thisFilters.filter((filter: string) => {
            return this.testFilter(
              this.filters || [],
              this.findFilter(this.filters || [], filter),
            )
          }).length
          break
        case 'NOR':
          isShown = this.thisFilters.some((filter: string) => {
            return !this.testFilter(
              this.filters || [],
              this.findFilter(this.filters || [], filter),
            )
          })
          break
        case 'OR':
        default:
          isShown = this.thisFilters.some((filter: string) => {
            return this.testFilter(
              this.filters || [],
              this.findFilter(this.filters || [], filter),
            )
          })
          break
      }
      return !isShown ? 'hidden' : ''
    },
  },
  mounted () {
    if ('tags' in this.project) {
      let thisFilters: string[] = []
      Object.values(this.project.tags).forEach((elem: string[]) => {
        thisFilters = thisFilters.concat(elem)
      })
      this.thisFilters = thisFilters as any
    }
  },
  methods: {
    testFilter (filters: any[], index: number): boolean {
      return (filters[index] as any)?.enabled
    },
    findFilter (filters: any[], filter: string): number {
      return filters.findIndex((other: any) => other.id === filter)
    },
    routeLink (e: any) {
      e.preventDefault()
      this.$router.push({
        path: e.target.pathname,
      })
    },
  },
})
</script>
