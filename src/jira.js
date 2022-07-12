import fetch from 'node-fetch'

const Jira = async (options = {}) => {
  const { host, token } = options

  const authHeader = `Bearer ${token}`

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

    const body = JSON.stringify({ timeSpent, comment })

    const response = await fetch(
      `${host}/rest/api/2/issue/${issueId}/worklog`,
      {
        method: 'POST',
        headers,
        body
      }
    )

    return response.json()
  }

  return {
    addWorkLog
  }
}

export default Jira
