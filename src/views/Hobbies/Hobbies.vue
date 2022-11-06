<template lang='pug'>
#main
  .main-container
    section(
      id='music'
    )
      h2 Music
      div
        BandcampEmbed(
          v-for='album in music',
          :key='album.albumId',
          :album-id='album.albumId',
          :href='album.href',
          :title='album.title',
        )
  .main-container
    section(
      id='art'
    )
      h2 Art
      GalleryEmbed(
        :images='images'
      )
</template>

<style lang='sass' scoped>
@import '@/styles/variables.sass'

#main
  display: flex
  .main-container
    &:nth-child(1)
      flex: 0 0 30%
    &:nth-child(2)
      flex: 1 1 auto
    h2
      margin-left: 1rem
      margin-top: 1rem
    #music
      &>div
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center

@media screen and (max-aspect-ratio: 5/4)
  #main
    flex-direction: column
    .main-container
      overflow: visible
      flex: 1 1 auto
      margin-top: 0
</style>

<script lang='ts'>
import {
  defineComponent, ref,
} from 'vue'
import yaml from 'js-yaml'

import BandcampEmbed from '@/components/embeds/BandcampEmbed.vue'
import GalleryEmbed from '@/components/embeds/GalleryEmbed.vue'

export default defineComponent({
  name: 'Hobbies',
  components: {
    BandcampEmbed,
    GalleryEmbed,
  },
  setup () {
    const images = ref([] as Array<any>)
    const music = ref([] as Array<any>)

    return {
      images,
      music,
    }
  },
  mounted () {
    fetch('/content/info.yml')
      .then((response) => response.blob())
      .then((blob) => blob.text())
      .then((yamlAsString) => yaml.load(yamlAsString))
      .then((yamlAsObj) => {
        this.images = ((yamlAsObj as any).fun.art as Array<any>).sort(() => (Math.random() > 0.5) ? 1 : -1)
        this.music = ((yamlAsObj as any).fun.music as Array<any>).sort(() => (Math.random() > 0.5) ? 1 : -1)
      })
  },
  head () {
    return {
      title: `Fun Stuff | Lightling`,
    }
  },
})
</script>
