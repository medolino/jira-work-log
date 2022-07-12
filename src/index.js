import 'dotenv/config'

import Jira from './jira.js'
import { parseLogWork } from './report.js'
import { today, todo } from '../log-file.js'

const host = process.env.JIRA_HOST
const token = process.env.JIRA_TOKEN;

(async () => {
  // TODO error handling
  const jira = await Jira({ host, token })

  const todayReport = parseLogWork(today, {})
  const todoReport = parseLogWork(todo)

  const logWorkPromises = today.map((options) => jira.addWorkLog(options))

  // log work to jira
  await Promise.all(logWorkPromises)

  // output md report
  console.log(`# Report\n\n## Today${todayReport}\n\n## Todo${todoReport}`)
})()
