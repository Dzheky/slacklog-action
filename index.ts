const github = require('@actions/github')
const core = require('@actions/core')
const { WebClient } = require('@slack/web-api')

const githubToken = core.getInput('GITHUB_TOKEN')
const slackClientSecret = core.getInput('SLACK_CLIENT_SECRET')
const slackClientId = core.getInput('SLACK_CLIENT_ID')
const slackChannel = 'CUQ1CMWRY'

const octokit = new github.GitHub(githubToken)
const context = github.context


const EVENTS = {
  PUSH: 'push',
  PULL_REQUEST: 'pull_request'
}

async function getSlackToken() {
  return await (new WebClient())?.oauth?.v2?.access({
    client_id: slackClientId,
    client_secret: slackClientSecret,
  })
}


async function run() {
  const access = await getSlackToken()
  console.log(JSON.stringify(access))
  if (!access || !access.access_token) {
    core.error('Wrong slack credentials! 😞')
    return
  }
  const slack = new WebClient(access.access_token)

  slack.chat.postMessage('Hello world', slackChannel)

  switch(context.eventName) {
    case EVENTS.PUSH:
      if (github.context?.payload?.commits?.length) {
        console.log(context.payload.commits)
      }
  }
  console.log(context)
}


run()