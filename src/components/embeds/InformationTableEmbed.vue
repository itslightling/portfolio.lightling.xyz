<template lang='pug'>
.information-table
  #info-title.parent-cell
    .title-cell.cell
      span Title
    .content-cell.cell
      span {{ project.formalTitle }}
  #info-company.parent-cell
    .title-cell.cell
      span Company
    .content-cell.cell
      span {{ project.company }}
  #info-role.parent-cell
    .title-cell.cell
      span Role
    .content-cell.cell
      span {{ project.role }}
  #info-tools.parent-cell
    .title-cell.cell
      span Language / Tools
    .content-cell.cell
      span(
        v-for='(tool, i) in project.tools',
        :key='`tool_${i}`',
        :class='`${tool.className} tool`',
      ) {{ tool.displayName }}
  #info-setting.parent-cell
    .title-cell.cell
      span Setting (Team Size)
    .content-cell.cell
      span {{ project.setting }}
  #info-period.parent-cell
    .title-cell.cell
      span Time Period
    .content-cell.cell
      span(
        v-for='(period, i) in project.period',
        :key='`period_${i}`',
      )
        | {{
        |   getDate(
        |     period.start,
        |     'long',
        |   )
        | }}
        | &nbsp;-&nbsp;
        | {{
        |   getDate(
        |     period.end,
        |     'long',
        |   )
        | }}
        | &nbsp;
  #info-status.parent-cell
    .title-cell.cell
      span Status
    .content-cell.cell
      span {{ project.status }}
</template>

<style lang='sass' scoped>
@import '@/styles/variables.sass'
@import '@/styles/shared/tool.sass'

.information-table
  font-size: 0.85rem
  margin-top: 0.125rem
  display: grid
  grid-template-areas: 'title setting' 'company period' 'role status' 'tools tools'
  grid-template-columns: repeat(2, 1fr)
  border-radius: 1rem
  .parent-cell
    display: grid
    grid-template-columns: 1fr 2fr
    border: 0.25rem solid $brand-dark-a
    margin: -0.125rem
    .cell
      padding: 0.25rem
      display: flex
      align-items: center
    .title-cell
      background-color: $brand-dark-a
      color: $brand-faint-a
      font-weight: bold
      font-family: $heading-family
  #info-title
    grid-area: title
    border-top-left-radius: 1rem
    .title-cell
      border-top-left-radius: 0.5rem
  #info-company
    grid-area: company
  #info-role
    grid-area: role
  #info-tools
    grid-area: tools
    grid-template-columns: 1fr 5fr
    border-bottom-left-radius: 1rem
    border-bottom-right-radius: 1rem
    .title-cell
      border-bottom-left-radius: 0.5rem
    .tool
      font-family: $heading-family
    .content-cell
      display: flex
      flex-wrap: wrap
  #info-setting
    grid-area: setting
    border-top-right-radius: 1rem
  #info-period
    grid-area: period
  #info-status
    grid-area: status
</style>

<script lang='ts'>
import {
  defineComponent, ref,
} from 'vue'
import {
  getLocalizedDateString,
} from '@/utilities/Projects'
import {
  ProjectContent,
} from '@/types/project/ProjectContent'

export default defineComponent({
  name: 'InformationTable',
  props: {
    project: {
      type: Object as () => ProjectContent,
      required: true,
    },
  },
  setup () {
    const getDate = ref(getLocalizedDateString)

    return {
      getDate,
    }
  },
})
</script>
