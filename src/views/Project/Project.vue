<template lang='pug'>
#main
  .main-container
    .details
      section(
        id="info",
      )
        h2 Information
        InformationTableEmbed(
          :project="currentProject",
        )
        p(
          v-if="currentProject.copyright !== undefined",
          class="copyright",
          v-html="currentProject.copyright",
        )
        section(
          v-if="currentProject.places !== undefined",
          id="places",
        )
          h3 Places
          ul
            li(
              v-for="(place, i) in currentProject.places",
              :key="`place_${i}`",
            )
              span
                a(
                  :href="place.path",
                  :title="place.title",
                  v-html="place.title",
                )
      section(
        id="summary",
      )
        h2 Summary
        p(
          v-for="(p, i) in currentProject.summary",
          :key="`summary${i}`",
          v-html="p",
        )
      section(
        v-if="currentProject.contributions !== undefined",
        id="contributions",
      )
        h2 My Contributions
        ContributionEmbed(
          v-for="(c, i) in currentProject.contributions",
          :key="`contribution_0_${i}`",
          :content="c",
          :level="0",
          type="section",
        )
    .samples(
      v-if=`
        currentProject.images !== undefined
        || currentProject.videos !== undefined
        || currentProject.snippets !== undefined
      `,
    )
      section(
        v-if="currentProject.images !== undefined",
        id="images",
      )
        h2 Images
        .gallery
          ImageEmbed(
            v-for="(image, i) in currentProject.images",
            :key="`image_${i}`",
            :image="image",
          )
      section(
        v-if="currentProject.videos !== undefined",
        id="videos",
      )
        h2 Videos
        .gallery
          VideoEmbed(
            v-for="(video, i) in currentProject.videos",
            :key="`image_${i}`",
            :video="video",
          )
      section(
        v-if="currentProject.snippets !== undefined",
        id="code",
      )
        h2 Code
        CodeEmbed(
          v-for="(snippet, i) in currentProject.snippets",
          :key="`snippet_${i}`",
          :snippet="snippet",
        )
</template>

<style lang="sass" scoped>
@import '@/styles/variables.sass'

div>main
  height: 100vh
  overflow: hidden
  width: 100vw
  .main-container
    margin: calc($header-upper-size + $header-lower-size) 0 0
    padding: 1rem
    height: calc(100% - ($header-upper-size + $header-lower-size + 2rem))
    overflow-y: scroll
    display: flex
    justify-content: center
    grid-gap: 2rem
    section
      background-color: lighten($brand-light-a, 5%)
      border: 2px dotted transparentize($brand-dark-a, 0.5)
      border-radius: 1rem
      padding: 1rem
      margin-bottom: 1rem
      & section::v-deep
        h3
          margin-bottom: 1rem
        h4,
        h5,
        h6
          margin: 1rem 0
        &:last-child
          margin-bottom: 0
        p:last-child
          margin-bottom: 0
      p
        margin-bottom: 0
      h2
        margin-bottom: 1rem
    .details::v-deep
      width: 36rem
      a::after
        height: 0.2rem !important
        bottom: -0.05rem
      .copyright
        margin-bottom: 1rem
      #places
        h3
          font-size: 1.5rem
        ul
          padding-left: 0
          list-style: none
          margin-bottom: 0
          li
            margin-top: 0.5rem
        a
          white-space: unset
          outline-width: 0.15rem
        a:link::after
          opacity: 0
        a:hover::after
          opacity: 1
    .samples
      width: calc(50% - 2rem)
      .gallery
        display: grid
        grid-gap: 1rem
      #videos .gallery
        grid-template-columns: repeat(2, 1fr)
      #images .gallery
        grid-template-columns: repeat(3, 1fr)
@media screen and (max-aspect-ratio: 6/4)
  div>main .main-container
    .samples
      #images .gallery
        grid-template-columns: repeat(2, 1fr)
@media screen and (max-aspect-ratio: 1/1)
  div>main .main-container
    display: grid
    grid-template-rows: repeat(2, 1fr)
    .details,
    .samples
      width: calc(100vw - 4rem)
@media screen and (max-aspect-ratio: 4/7)
  div>main .main-container
    .samples
      #images .gallery,
      #videos .gallery
        grid-template-columns: repeat(1, 1fr)
</style>

<script lang="ts">
import {
  defineComponent, ref,
} from 'vue'
import yaml from 'js-yaml'

import CodeEmbed from '@/components/embeds/CodeEmbed.vue'
import ContributionEmbed from '@/components/embeds/ContributionEmbed.vue'
import ImageEmbed from '@/components/embeds/ImageEmbed.vue'
import InformationTableEmbed from '@/components/embeds/InformationTableEmbed.vue'
import VideoEmbed from '@/components/embeds/VideoEmbed.vue'

import {
  ProjectContent,
} from '@/types/project/ProjectContent'

import {
  defaultProject,
} from '@/utilities/Projects'

export default defineComponent({
  name: 'Project',
  components: {
    CodeEmbed,
    ContributionEmbed,
    ImageEmbed,
    InformationTableEmbed,
    VideoEmbed,
  },
  setup () {
    const currentProject = ref(defaultProject)

    return {
      currentProject,
    }
  },
  head () {
    return {
      title: `${(this.currentProject as ProjectContent).formalTitle} | Lightling`,
    }
  },
  mounted () {
    const id = this.$route.params.id
    fetch(`/content/projects/${id}.yml`)
      .then((response) => response.blob())
      .then((blob) => blob.text())
      .then((yamlAsString) => yaml.load(yamlAsString))
      .then((yamlAsObj) => {
        this.currentProject = (yamlAsObj as ProjectContent)
      })
  },
})
</script>
