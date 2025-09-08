/**
 * Generate report from log work data
 */
const parseLogWork = (logWorkData) =>
  logWorkData.reduce((reportData, { issueId, comment }) => `${reportData}\n${issueId}${comment}`, '')

/**
 * Convert seconds to Jira time format (e.g., "1h 30m")
 */
const convertSecondsToTimeSpent = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)

  const timeSpent = `${hours}h ${minutes}m`

  return timeSpent
}

export {
  parseLogWork,
  convertSecondsToTimeSpent
}
