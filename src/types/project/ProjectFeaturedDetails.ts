import { ProjectDetails } from './ProjectDetails'

/**
 * Project details specifically for being featured (i.e. on the home index page)
 */
export type ProjectFeaturedDetails = {
  featuredSummary?: string
}
  & ProjectDetails
