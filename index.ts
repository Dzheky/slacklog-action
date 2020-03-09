const github = require('@actions/github')
const core = require('@actions/core')
const { WebClient } = require('@slack/web-api')

const githubToken = core.getInput('GITHUB_TOKEN')
const slackClientToken = core.getInput('SLACK_CLIENT_TOKEN')
const slackChannel = 'CUQ1CMWRY'

const octokit = new github.GitHub(githubToken)
const context = github.context


const EVENTS = {
  PUSH: 'push',
  PULL_REQUEST: 'pull_request'
}


async function run() {
  try {
    const slack = new WebClient(slackClientToken)
    slack.chat.postMessage({
      text: 'Hello world',
      channel: slackChannel
    })
  } catch (e) {
    core.setFailed('Something wrong with slack credentials!')
  }


  switch(context.eventName) {
    case EVENTS.PUSH:
      if (github.context?.payload?.commits?.length) {
        console.log(context.payload.commits)
      }
  }
  console.log(context)
}


run()