const github = require('@actions/github')
const core = require('@actions/core')
const myToken = core.getInput('GITHUB_TOKEN')
const octokit = new github.GitHub(myToken)
const context = github.context


const EVENTS = {
  PUSH: 'push',
  PULL_REQUEST: 'pull-request'
}


async function run() {
  switch(context.eventName) {
    case EVENTS.PUSH:
      if (github.context?.payload?.commits?.length) {
        console.log(context.payload.commits)
      }
  }
  console.log(context)
}


run()