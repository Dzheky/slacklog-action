const github = require('@actions/github')
const core = require('@actions/core')
const { WebClient } = require('@slack/web-api')

const slackClientToken = core.getInput('SLACK_CLIENT_TOKEN')
const slackChannel = core.getInput('SLACK_CHANNEL_ID')

const context = github.context


const EVENTS = {
  PUSH: 'push',
  PULL_REQUEST: 'pull_request'
}

interface Commit {
  author: {
    email: string,
    name: string
  },
  committer: {
    email: string,
    name: string
  },
  distinct: boolean,
  id: string,
  message: string,
  timestamp: string,
  tree_id: string,
  url: string
}


async function run() {
  let message = ''
  const slack = new WebClient(slackClientToken)


  switch(context.eventName) {
    case EVENTS.PUSH:
      if (github.context?.payload?.commits?.length) {
        console.log(context.payload.commits)
        context.payload.commits.forEach((commit: Commit) => {
          const [title, ...description] = commit.message.split('\n')
          message += `[<${commit.url}|${commit.id.substring(0, 7)}>] *${title}*${description ? description.join('\n') : '\n'} - (${commit.author.name})`
        })

        slack.chat.postMessage({
          text: message,
          channel: slackChannel
        })
      }
  }
  console.log(context)
}


run()