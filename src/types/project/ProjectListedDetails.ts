import { ProjectDetails } from './ProjectDetails'
import { ProjectTags } from './ProjectTags'

/**
 * Project details specifically for being listed (i.e. on the portfolio index page)
 */
export type ProjectListedDetails = {
  listedSummary: string[]
  tags: ProjectTags
}
  & ProjectDetails
