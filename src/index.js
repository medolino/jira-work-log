import 'dotenv/config'

import Jira from './jira.js'
import { parseLogWork, convertSecondsToTimeSpent } from './report.js'
import { today, todo } from '../log-file.js'

const host = process.env.JIRA_HOST
const username = process.env.JIRA_USERNAME
const token = process.env.JIRA_TOKEN;

(async () => {
  const jira = await Jira({ host, username, token })

  const todayReport = parseLogWork(today)
  const todoReport = parseLogWork(todo)

  const logWorkPromises = today.map((options) => jira.addWorkLog(options))

  // log work to jira
  const results = await Promise.all(logWorkPromises)

  // output md report
  console.log('-----------------------------')
  console.log('# Report')
  console.log('-----------------------------')
  console.log(`## Today${todayReport}\n\n## Todo${todoReport}\n`)

  // output results
  console.log('-----------------------------')
  console.log('# Results')
  console.log('-----------------------------')

  for (const result of results) {
    if (result.status === 'FAILED') {
      console.error(`Failed: ${result.issueId}`)
      console.error('Error:', result.error)
    } else {
      console.log(`Success: ${result.issueId}`)
    }
  }

  // output total logged time
  const totalLoggedTimeInSeconds = results
    .filter((result) => result.status === 'SUCCESS')
    .reduce((sum, result) => sum + result.logTime, 0)

  const totalLoggedTime = convertSecondsToTimeSpent(totalLoggedTimeInSeconds)

  console.log('\n-----------------------------')
  console.log('# Total logged time')
  console.log('-----------------------------')
  console.log(`Logged time: ${totalLoggedTime}`)
})()
