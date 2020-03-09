const github = require('@actions/github')
const core = require('@actions/core')
const myToken = core.getInput('GITHUB_TOKEN')
const octokit = new github.GitHub(myToken)


async function run() {
  const data = await octokit.pulls.get();

  console.log(data)
}


run()