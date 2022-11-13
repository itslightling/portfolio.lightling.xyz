<template lang='pug'>
#main
  .main-container
    section(
      id='contact',
    )
      h2 Contact
      .wide
        SocialButton(
          v-for='info in contact.primary',
          :key='info.title',
          :title='info.title',
          :link='info.link',
          :image-src='info.imageSrc',
          :is-wide='true',
        )
      .small
        SocialButton(
          v-for='info in contact.secondary',
          :key='info.title',
          :title='info.title',
          :link='info.link',
          :image-src='info.imageSrc',
        )
  .main-container
    section(
      id='about',
    )
      h2 About
      AboutInfoEmbed(
        v-for='info in descriptions',
        :id='info.id',
        :key='info.id',
        :heading='info.heading',
        :image-src='info.imageSrc',
        :image-alt='info.imageAlt',
        :body='info.body',
      )
</template>

<style lang='sass' scoped>
@import '@/styles/variables.sass'

#main
  display: flex
  .main-container
    flex: 0 0 calc(50% - 1rem)
    &>section
      border-radius: 1rem
      background-color: $brand-light-a
      margin: 1rem
      min-height: calc(100% - 4rem)
      padding: 1rem
    #about
      &>section
        margin: 1rem 0
    #contact
      &>div
        margin-top: 1rem
      &>.wide::v-deep
        display: grid
        grid-template-columns: 1fr 1fr
        grid-gap: 2rem
        .social-button
          height: 6rem
          font-size: 1.25rem
      &>.small::v-deep
        display: flex
        flex-wrap: wrap
        grid-gap: 0.5rem
        .social-button
          height: 7rem
          width: 4rem
          font-size: 0.85rem
          padding: 0 0.5rem

@media screen and (max-aspect-ratio: 6/4)
  #main
    flex-direction: column
    .main-container
      flex: 1 1 auto
      margin-top: 0

@media screen and (orientation: portrait)
  #main
    .main-container
      #contact
        &>.wide::v-deep
          grid-template-columns: 1fr
          grid-gap: 0.5rem
          .social-button
            height: 5rem

@media screen and (max-width: 600px)
  div>main
    .main-container
      &>section
        padding: 1rem 0.5rem
        margin: 0.25rem
</style>

<script lang='ts'>
import {
  defineComponent, ref,
} from 'vue'
import yaml from 'js-yaml'

import AboutInfoEmbed from '@/components/embeds/AboutInfoEmbed.vue'
import SocialButton from '@/components/navigation/SocialButton.vue'

export default defineComponent({
  name: 'About',
  components: {
    AboutInfoEmbed,
    SocialButton,
  },
  setup () {
    const descriptions = ref([] as Array<any>)
    const contact = ref({} as any)

    return {
      contact,
      descriptions,
    }
  },
  mounted () {
    fetch('/content/info.yml')
      .then((response) => response.blob())
      .then((blob) => blob.text())
      .then((yamlAsString) => yaml.load(yamlAsString))
      .then((yamlAsObj) => {
        this.descriptions = (yamlAsObj as any).about
        this.contact = (yamlAsObj as any).contact
      })
  },
  head () {
    return {
      title: `About & Contact | Lightling`,
    }
  },
})
</script>
