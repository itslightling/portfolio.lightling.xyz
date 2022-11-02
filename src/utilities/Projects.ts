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
