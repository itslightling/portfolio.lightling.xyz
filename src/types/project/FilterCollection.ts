import { ProjectFilter } from "./ProjectFilter"

/**
 * Container for laying out filter inputs
 */
 export type FilterCollection = {
  display: string
  filters: Array<ProjectFilter>
  id: string
}
