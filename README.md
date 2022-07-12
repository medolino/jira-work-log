# JIRA Work Log

NodeJS tool for parsing JS work log file, sending work log to Jira, and preparing markdown report.

## How It Works

Script parses `log-file.js` in which user logs his daily work and plan for the future.<br>
After successful parsing, daily work is sent to Jira.<br>
As a final result, a markdown report is built and dumped to console.

## Install

Create a folder and make it your current working directory:

```
mkdir jira-work-log
cd jira-work-log
```

Clone project:

```bash
git clone git@github.com:medolino/jira-work-log.git .
```

Install dependencies:
``` bash
npm install
```

Create a new `.env` configuration file with Jira host and access token:

```env
JIRA_HOST=https://jira-url
JIRA_TOKEN=accessToken
```

Create a new `log-file.js` file in which you will log your daily work:
```js
const today = [
  {
    issueId: 'ISSUE-55',
    timeSpent: '1h',
    comment: `
    - comment what has been done`
  }
]

const todo = [
  {
    issueId: 'ISSUE-56',
    timeSpent: '',
    comment: `
    - plan for the future days`
  }
]

export {
  today,
  todo
}
```

Execute script to parse data and send work log to Jira:

```bash
node start
```

After successful execution, you should receive a markdown report like the one below:
```bash
# Report

## Today
ISSUE-55
    - comment what has been done

## Todo
ISSUE-56
    - plan for the future days
```