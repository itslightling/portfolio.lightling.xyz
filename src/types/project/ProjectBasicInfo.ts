import { ProjectPeriod } from './ProjectPeriod'

/**
 * Defines basic info available to any instance of a project on the site
 */
export type ProjectBasicInfo = {
  formalTitle: string
  period: ProjectPeriod[]
}
