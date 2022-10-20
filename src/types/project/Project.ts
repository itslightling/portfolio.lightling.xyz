import { ProjectContent } from './ProjectContent'
import { ProjectFeaturedDetails } from './ProjectFeaturedDetails'
import { ProjectListedDetails } from './ProjectListedDetails'

/**
 * Defines project information in its entirety.
 * This is a summative type of various other project information types
 * that are all used in various parts of the site,
 * and this is used for actually listing projects.
 */
export type Project = {
  isExperimental: boolean
  isFeatured: boolean
}
  & ProjectContent
  & ProjectFeaturedDetails
  & ProjectListedDetails
