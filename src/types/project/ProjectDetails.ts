import { ProjectBasicInfo } from './ProjectBasicInfo'
import { ProjectLink } from './ProjectLink'

/**
 * Shared project details for project tiles
 */
export type ProjectDetails = {
  id: string
  image: string
  link: ProjectLink
  note?: string
}
  & ProjectBasicInfo
