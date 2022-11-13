<template lang='pug'>
header
  a.avatar(
    @click='routeLink',
    href='/',
    aria-label='link back home',
  )
    div
      img(
        :src='logo.src',
        :alt='logo.alt',
      )
  button.mobile(
    @click='() => onToggle(!mobileOpen)',
    text='Menu',
  )
  div(
    :class='`upper ${mobileOpen ? "visible" : ""}`',
  )
    a(
      :class='{ active: currentUrl === "/portfolio"}',
      @click='routeLink',
      href='/portfolio',
    )
      | Portfolio
    a(
      :class='{ active: currentUrl === "/about"}',
      @click='routeLink',
      href='/about',
    )
      | About &amp; Contact
    a(
      :class='{ active: currentUrl === "/hobbies"}',
      @click='routeLink',
      href='/hobbies',
    )
      | Fun Stuff
  div(
    v-if='currentUrl !== "/"',
    :class='`lower ${mobileOpen ? "visible" : ""}`',
  )
    span(
      v-for='(route, index) in currentRoute',
      :key='index',
    )
      span(
        v-if='index < currentRoute.length - 1',
      )
        a(
          :href='route.path',
          :title='route.title',
          @click='routeLink',
        )
          span {{ route.title }}
        span.
          &nbsp;/&nbsp;
      span(
        v-else='',
      ) {{ route.title }}
</template>

<style lang='sass' scoped>
@import '@/styles/variables.sass'

header
  .mobile
    display: none
    visibility: hidden
  z-index: 99
  position: fixed
  width: 100vw
  height: $header-upper-size + $header-lower-size
  top: 0
  left: 0
  font-family: $heading-family
  .avatar
    position: absolute
    width: calc($header-upper-size / 2 + $header-lower-size + 0.5rem)
    height: calc($header-upper-size / 2 + $header-lower-size + 0.5rem)
    bottom: 0.25rem
    left: calc(($header-upper-size / 2 + $header-lower-size / 2 + 0.5rem) / 2)
    display: block
    &:after
      display: none
    &>div
      width: 100%
      height: 100%
      background-color: $brand-bright-a
      border-radius: 50%
      border: 0.25rem solid rgba($brand-dark-a, 0.5)
      box-sizing: border-box
      &:after
        content: 'Back Home'
        position: absolute
        left: 0
        right: 0
        font-size: 1.5rem
        font-weight: bold
        text-align: center
        top: 1rem
        bottom: 1.5rem
        pointer-events: none
        transition: all $brand-anim-a
        opacity: 0
        white-space: normal
      &:hover:after
        opacity: 1
        color: $brand-dark-a
      &:active:after
        transform: scale(0.5)
      img
        width: 100%
        height: 100%
        transition: all $brand-anim-a
        &:hover
          opacity: 0.25
        &:active
          transform: scale(0.85)
  &>div:not(.avatar)
    display: flex
    justify-content: left
    padding-left: 10rem
  a
    *:not(a):active
      pointer-events: none
    &:after
      background-color: $brand-bright-a
  .upper
    background-color: $brand-dark-a
    height: $header-upper-size
    grid-gap: 2rem
    font-size: 2.5rem
    a
      padding-bottom: 0.5rem
      &:after
        margin-bottom: 0.25rem
  .lower
    background-color: rgba($brand-dark-a, 0.5)
    backdrop-filter: blur(8px)
    height: $header-lower-size
    z-index: -1
    position: relative
    span
      font-size: 2rem
      height: $header-lower-size - 0.25rem
      margin: auto 0
      color: $brand-light-a
      a
        span
          color: $brand-bright-a
          font-weight: bold
  .lower-hidden
    height: $header-lower-size
    display: none
  a
    color: $brand-light-a
    align-self: flex-end
    text-decoration: none
@media screen and (max-aspect-ratio: 1/1)
  header
    height: calc($header-upper-size / 2 + $header-lower-size)
    .avatar
      height: calc($header-upper-size / 2 + $header-lower-size)
      width: calc($header-upper-size / 2 + $header-lower-size)
      bottom: 0
      &>div
        &::after
          font-size: 1.25rem
    .upper
      font-size: 1.5rem
      height: calc($header-upper-size / 2)
    .lower
      span
        font-size: 1.5rem
        padding-top: 0.5rem
@media screen and (max-aspect-ratio: 5/7)
  header::v-deep
    background-color: $brand-dark-a
    height: calc($header-upper-size / 2 + $header-lower-size / 2 + 0.5rem)
    .mobile
      visibility: visible
      display: block
    button
      position: absolute
      right: 0.5rem
      top: 0.5rem
    &>div:not(.avatar)
      padding-left: 0
    .avatar
      height: calc($header-upper-size / 2 + $header-lower-size / 2)
      width: calc($header-upper-size / 2 + $header-lower-size / 2)
      left: 0.25rem
      top: 0.25rem
      &>div
        &::after
          font-size: 0.9rem
    .upper
      grid-gap: 0.75rem
      flex-direction: column
      transform: translateY(-100vh)
      transition: transform $brand-anim-a
      height: auto
      &.visible
        transform: translateY(0)
        a
          align-self: center
    .lower
      transform: translateY(-125vh)
      transition: transform $brand-anim-a
      height: 90vh
      &.visible
        transform: translateY(0)
      span
        padding-top: 0
        margin: 0
</style>

<script lang='ts'>
import { defineComponent, ref } from 'vue'
import { RouteLocation } from 'vue-router'
import yaml from 'js-yaml'

import Button from '@/components/inputs/Button.vue'

import { Project } from '@/types/project/Project'
import { ProjectLink } from '@/types/project/ProjectLink'

export default defineComponent({
  name: 'Header',
  components: {
    Button,
  },
  setup () {
    const currentRoute = ref([] as Array<ProjectLink>)
    const currentUrl = ref('')
    const logo = ref({})
    const mobileOpen = ref(false)
    const projectRoutes = ref([] as Array<ProjectLink>)

    return {
      currentRoute,
      currentUrl,
      logo,
      mobileOpen,
      projectRoutes,
    }
  },
  mounted () {
    fetch('/content/info.yml')
      .then((response) => response.blob())
      .then((blob) => blob.text())
      .then((yamlAsString) => yaml.load(yamlAsString))
      .then((yamlAsObj) => {
        this.logo = (yamlAsObj as any).home.logo
      })
    this.currentUrl = this.$route.path
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
        this.projectRoutes = projects.map((project) => project.link)
        this.updateUrl()
      })
  },
  watch: {
    $route (to: RouteLocation, from: RouteLocation) {
      this.currentUrl = to.fullPath
      this.updateUrl()
    }
  },
  methods: {
    onToggle (visibility: boolean) {
      this.mobileOpen = visibility
    },
    routeLink (e: any) {
      e.preventDefault()
      this.$router.push({
        path: e.target.pathname,
      })
    },
    updateUrl () {
      const paths: Array<ProjectLink> = this.currentUrl.split('/').filter((url) => url !== '').map((str) => ({
        path: str,
        title: str[0].toUpperCase() + str.substring(1),
      }))
      this.currentRoute = paths.map((path) => this.projectRoutes.find((project) => path.path === project.path) || path)
    }
  },
})
</script>
