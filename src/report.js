const parseLogWork = (logWorkData) =>
  logWorkData.reduce((reportData, { issueId, comment }) => `${reportData}\n${issueId}${comment}`, '')

export {
  parseLogWork
}
