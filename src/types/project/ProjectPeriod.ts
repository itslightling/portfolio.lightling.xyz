/**
 * Defines a project's start and end periods.
 * These can be a number of different formats
 * due to the degree of specificity of period start/end points.
 * That is, they can be as specific as a day of a month
 * or as general as a year. "End" can also often say "current".
 * The general format should be as follows:
 * * If exact date is available, 'YYYY-MM-DD'
 * * If up to month is available, 'YYYY-MM'
 * * If only year is available, 'YYYY'
 * * If current, use 'current'
 */
export type ProjectPeriod = {
  end: string
  start: string
}
