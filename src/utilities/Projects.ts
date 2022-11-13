import { ProjectBasicInfo } from '@/types/project/ProjectBasicInfo'
import { ProjectContent } from '@/types/project/ProjectContent'

/**
 * Compares two projects by period. This prefers projects with newer end dates, falling back to start dates only if both are current
 * @param a A project to compare with
 * @param b A project to compare against
 * @returns -1 if project A is more recent, 1 if project B is more recent, 0 if both have the same end dates (or same start dates if both are current)
 */
export const compareProjectsByPeriod = (
  a: ProjectBasicInfo,
  b: ProjectBasicInfo,
): number => {
  const aIsCurrent = a.period[a.period.length - 1].end.toLowerCase().trim() === 'current'
  const bIsCurrent = b.period[b.period.length - 1].end.toLowerCase().trim() === 'current'
  if (aIsCurrent && !bIsCurrent) {
    // if b is current and a is not, b is more recent (-1)
    return -1
  } else if (bIsCurrent && !aIsCurrent) {
    // if a is current and b is not, a is more recent (1)
    return 1
  } else if (aIsCurrent && bIsCurrent) {
    // if a and b are both current, compare start times
    const startA = new Date(a.period[0].start).getTime()
    const startB = new Date(b.period[0].start).getTime()
    if (startA < startB) {
      return 1
    } else if (startA > startB) {
      return -1
    } else {
      return 0
    }
  } else {
    // if a nd b are neither current, compare end times
    const endA = new Date(a.period[a.period.length - 1].end).getTime()
    const endB = new Date(b.period[b.period.length - 1].end).getTime()
    if (endA < endB) {
      return 1
    } else if (endA > endB) {
      return -1
    } else {
      return 0
    }
  }
}

/**
 * Container for a default/empty project for loading state purposes
 */
 export const defaultProject: ProjectContent = {
  formalTitle: 'Loading...',
  company: 'Loading...',
  role: 'Loading...',
  setting: 'Loading...',
  period: [
    {
      start: 'MMM YYYY',
      end: 'MMM YYYY',
    },
  ],
  status: 'Loading...',
  tools: [],
  summary: [
    'Loading project...',
  ],
}

/**
 * Utility for converting the general date format of a project's period to a localized date string
 * @param dateString The string to convert
 * @param monthFormat The format used for the month of the date
 * @param yearFormat The format used for the year of the date, defaults to 'numeric'
 * @param dayFormat The format used for the day of the date, defaults to 'numeric'
 * @returns dateString if 'Current'
 * or toLocaleDateString with specified formatting options
 * and degree of specifity based off dateString
 */
 export const getLocalizedDateString = (
  dateString: string,
  monthFormat: Intl.DateTimeFormatOptions['month'],
  yearFormat: Intl.DateTimeFormatOptions['year'] = 'numeric',
  dayFormat: Intl.DateTimeFormatOptions['day'] = 'numeric',
): string => {
  if (dateString.trim().toLowerCase() === 'current') {
    return dateString
  }

  const split = dateString.split('-')
  let options: Intl.DateTimeFormatOptions = {
  }

  switch (split.length) {
    case 3:
      options = {
        year: yearFormat,
        month: monthFormat,
        day: dayFormat,
        timeZone: 'utc',
      }
      break
    case 2:
      options = {
        year: yearFormat,
        month: monthFormat,
        timeZone: 'utc',
      }
      break
    case 1:
    default:
      options = {
        year: yearFormat,
        timeZone: 'utc',
      }
      break
  }

  return new Date(dateString).toLocaleDateString('en', options)
}
