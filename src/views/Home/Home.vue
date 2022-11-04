<template lang='pug'>
#main
  Featured(
    :featured='featured'
  )
  Motto(
    :motto='motto'
    :logo='logo'
  )
  Statement(
    :statement='statement'
    :photo='photo'
  )
</template>

<style lang='sass' scoped>
@import '@/styles/variables.sass'

</style>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import yaml from 'js-yaml'

import { Project } from '@/types/project/Project'

import Featured from './Featured.vue'
import Motto from './Motto.vue'
import Statement from './Statement.vue'

export default defineComponent({
    name: "Home",
    components: {
      Featured,
      Motto,
      Statement,
    },
    setup () {
      const featured = ref([] as Array<Project>)

      const motto = ref([])
      const statement = ref([])

      const logo = ref({})
      const photo = ref({})

      return {
        featured,
        logo,
        motto,
        photo,
        statement,
      }
    },
    mounted() {
      fetch('/content/info.yml')
        .then((response) => response.blob())
        .then((blob) => blob.text())
        .then((yamlAsString) => yaml.load(yamlAsString))
        .then((yamlAsObj) => {
          this.motto = (yamlAsObj as any).home.motto
          this.statement = (yamlAsObj as any).home.statement
          this.logo = (yamlAsObj as any).home.logo
          this.photo = (yamlAsObj as any).home.photo
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
          this.featured = projects.filter((proj) => proj.isFeatured)
        })
    }
})
</script>
