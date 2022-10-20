import { CodeSnippet } from '../CodeSnippet'
import { DetailedImageElement } from '../DetailedImageElement'
import { DetailedVideoElement } from '../DetailedVideoElement'
import { ProjectBasicInfo } from './ProjectBasicInfo'
import { ProjectLink } from './ProjectLink'
import { ProjectTool } from './ProjectTool'

/**
 * Defines main project content for individual project pages
 */
export type ProjectContent = {
  company: string
  contributions?: Object[]
  copyright?: string
  images?: DetailedImageElement[]
  places?: ProjectLink[]
  role: string
  setting: string
  snippets?: CodeSnippet[]
  status: string
  summary: string[]
  tools: ProjectTool[]
  videos?: DetailedVideoElement[]
}
  & ProjectBasicInfo
