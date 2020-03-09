# slacklog-action
An action to post changelog of the last push to the branch.

###Workflows config
```$xslt
name: CI
on:
  push:
    branches: [ master ]
jobs:
  build:
    name: Slacklog
    runs-on: ubuntu-latest
    steps:
      - uses: dzheky/slacklog-action@master
        with:
          SLACK_CLIENT_TOKEN: ${{ secrets.SLACK_CLIENT_TOKEN }}
          SLACK_CHANNEL_ID: ${{ secrets.SLACK_CHANNEL_ID }}
```

`SLACK_CLIENT_TOKEN` needs to have scope to send messages like: `chat:write`, `chat:write.public`, `groups:write`