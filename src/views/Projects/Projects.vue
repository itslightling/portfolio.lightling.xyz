<template lang='pug'>
#main
  #portfolio.main-container
    section(
      id='projects',
      class='gallery',
    )
      h2 Projects
      div
        ProjectEmbed(
          v-for='project in currentProjects.portfolio',
          :key='project.id',
          :project='project',
          :filters='currentFilters',
          :operator='currentFilterOperator',
        )
    section(
      id='experimental',
      class='gallery',
    )
      h2 Experimental
      div
        ProjectEmbed(
          v-for='project in currentProjects.experimental',
          :key='project.id',
          :project='project',
          :filters='currentFilters',
          :operator='currentFilterOperator',
        )
  #filters.main-container
    section
      h2 Filters
      div
        fieldset(
          id='filters-global',
        )
          legend Global
          Button(
            text='Select None',
            @click='() => onResetSelection(false)',
          )
          Button(
            text='Select All',
            @click='() => onResetSelection(true)',
          )
        fieldset(
          v-for='filterSet in filterSets',
          :key='filterSet.id',
        )
          legend {{ filterSet.display }}
          Checkbox(
            v-for='filter in filterSet.filters',
            :key='filter.id',
            :name='filter.id',
            :label='filter.display',
            @change='onCheckboxChanged',
          )
</template>

<style lang='sass' scoped>
@import '@/styles/variables.sass'

#main
  overflow: hidden
  height: 100%
  display: flex
  .main-container
    @include webkit-scrollbar
    padding-top: 1rem
    overflow-y: scroll
    section
      border-radius: 1rem
      height: auto
      background-color: $brand-light-a
      padding: 1rem
      margin: 0 1rem 1rem
      h2
        margin-bottom: 1.5rem
  #portfolio
    flex: 1 1 auto
    .gallery
      &>div
        display: grid
        grid-template-columns: repeat(4, 1fr)
        grid-gap: 0 2rem
  #filters
    flex: 0 0 24rem
    fieldset
      border-radius: 1rem
      border: 0.25rem solid $brand-dark-b
      margin-bottom: 1rem
      padding: 1rem
      &:last-of-type
        margin-bottom: 0
      legend
        text-transform: capitalize
      .checkbox
        margin-bottom: 0.25rem
        &:last-of-type
          margin-bottom: 0
    #filters-global
      display: flex
      &>*
        flex: 1 1 50%

@media screen and (max-aspect-ratio: 6/4)
  #main
    #portfolio
      .gallery
        &>div
          grid-template-columns: repeat(3, 1fr)

@media screen and (max-aspect-ratio: 5/4)
  #main
    #portfolio
      .gallery
        &>div
          grid-template-columns: repeat(2, 1fr)

@media screen and (max-width: 850px)
  #main
    #filters
      flex: 0 0 16rem
      section
        padding: 1rem 0.5rem
      fieldset
        padding: 0.25rem

@media screen and (max-aspect-ratio: 4/5)
  #main
    #portfolio
      .gallery
        &>div
          grid-template-columns: repeat(1, 1fr)

@media screen and (max-width: 620px)
  #main
    #filters
      display: none
</style>

<script lang='ts'>
import {
  defineComponent, ref,
} from 'vue'
import yaml from 'js-yaml'

import {
  FilterCollection,
} from '@/types/project/FilterCollection'
import {
  FilterOperator,
} from '@/types/project/FilterOperator'
import { compareProjectsByPeriod } from '@/utilities/Projects'

import Button from '@/components/inputs/Button.vue'
import Checkbox from '@/components/inputs/Checkbox.vue'
import ProjectEmbed from '@/components/embeds/ProjectEmbed.vue'
import { ProjectListedDetails } from '@/types/project/ProjectListedDetails'
import { Project } from '@/types/project/Project'

export default defineComponent({
  name: 'Portfolio',
  components: {
    Button,
    Checkbox,
    ProjectEmbed,
  },
  setup () {
    const currentProjects = ref({
      portfolio: [] as Array<ProjectListedDetails>,
      experimental: [] as Array<ProjectListedDetails>,
    })
    const filterSets = ref([] as Array<FilterCollection>)
    const currentFilters = ref([] as Array<any>)

    const currentFilterOperator = ref('OR' as FilterOperator)

    return {
      currentFilterOperator,
      currentFilters,
      currentProjects,
      filterSets,
    }
  },
  head () {
    return {
      title: `Portfolio | Lightling`,
    }
  },
  mounted () {
    fetch('/content/filters.yml')
      .then((response) => response.blob())
      .then((blob) => blob.text())
      .then((yamlAsString) => yaml.load(yamlAsString))
      .then((yamlAsArr) => {
        this.filterSets = yamlAsArr as Array<FilterCollection>
        this.currentFilters = Object.values(this.filterSets).map(
          (set) => set.filters.map(
            (filter: any) => ({
              ...filter,
              enabled: true,
            }),
          ),
        ).flat()
      })
    fetch('/content/projects.yml')
      .then((response) => response.blob())
      .then((blob) => blob.text())
      .then((yamlAsString) => yaml.load(yamlAsString))
      .then((yamlAsObj) => {
        const projects = (yamlAsObj as Array<any>).map((str) => fetch(`/content/projects/${str}.yml`))
        return Promise.all(projects)
      })
      .then((responses) => {
        const parsed = responses.map((response) => 
          response.blob()
            .then((blob) => blob.text())
            .then((str) => yaml.load(str))
        )
        return Promise.all(parsed as Array<any> as Array<Project>)
      })
      .then((projects) => {
        projects.sort(compareProjectsByPeriod)
        projects.forEach((project) => {
          if (project.isExperimental) {
            this.currentProjects.experimental.push(project)
          } else {
            this.currentProjects.portfolio.push(project)
          }
        })
      })
  },
  methods: {
    onCheckboxChanged (e: any) {
      const indexOfFilter = this.currentFilters.findIndex((filter) => filter.id === e.target.id)
      this.currentFilters[indexOfFilter].enabled = e.target.checked
    },
    onResetSelection (state: boolean) {
      document.querySelectorAll('#filters input[type=checkbox]').forEach((input) => {
        (input as any).checked = state
      })
      this.currentFilters.forEach((filter) => {
        filter.enabled = state
      })
    },
  },
})
</script>
