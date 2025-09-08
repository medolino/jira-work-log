import fetch from 'node-fetch'

/**
 * Converts a time spent string (e.g., "1h 30m") to seconds.
 */
const _convertTimeSpentToSeconds = (timeSpent) => {
  return timeSpent
    .split(' ')
    .map((t) => {
      const unit = t.slice(-1)
      const value = parseInt(t.slice(0, -1), 10)

      switch (unit) {
        case 'h':
          return value * 3600
        case 'm':
          return value * 60
        default:
          return 0
      }
    })
    .reduce((sum, currSec) => sum + currSec, 0)
}

/**
 * Prepares a comment in Jira's rich text format from a plain text comment.
 */
const _prepareComment = (sourceComment) => {
  // split comment into lines and trim each line
  const comments = sourceComment
    .split('\n')
    .filter((line) => line.trim() !== '') // remove empty lines
    .map((line) => {
      return {
        type: 'listItem',
        content: [{
          type: 'paragraph',
          content: [{
            type: 'text',
            text: line.trim().replace(/^- /, '') // remove leading dash if present
          }]
        }]
      }
    })

  return {
    version: 1,
    type: 'doc',
    content: [{ type: 'bulletList', content: comments }]
  }
}

const Jira = async (options = {}) => {
  const { host, username, token } = options

  const authHeader = `Basic ${Buffer.from(`${username}:${token}`).toString('base64')}`

  const headers = {
    Authorization: authHeader,
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }

  const addWorkLog = async (options = {}) => {
    const { issueId, timeSpent, comment } = options

    if (!issueId || !timeSpent || !comment) {
      throw new Error('Missing one of required log work parameters.')
    }

    const bodyContent = _prepareComment(comment)

    const body = JSON.stringify({
      timeSpent,
      comment: bodyContent
    })

    const response = await fetch(
      `${host}/rest/api/3/issue/${issueId}/worklog`,
      {
        method: 'POST',
        headers,
        body
      }
    )

    if (response.status < 200 || response.status >= 300) {
      const result = {
        status: 'FAILED',
        issueId,
        error: await response.json()
      }

      return result
    } else {
      const loggedTimeInSeconds = _convertTimeSpentToSeconds(timeSpent)

      const result = {
        status: 'SUCCESS',
        issueId,
        logTime: loggedTimeInSeconds,
        response: await response.json()
      }

      return result
    }
  }

  return {
    addWorkLog
  }
}

export default Jira
