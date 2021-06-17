# Twitter-Result-Bot
A twitter bot for fetching and sending results from university website

## Instructions
1. Run ```git clone git@github.com:ShivamJoker/Twitter-Result-Bot.git``` in your Terminal.
2. ```cd Twitter-Result-Bot``` to switch to directory
3. ```yarn install``` to install all package.json dependencies.
4. Create a new file named ```config.js```, and copy the contents of ```configExample.js``` into ```config.js```.

## Getting Twitter keys and secrets for ```config.js```
1. Sign in to Twitter (preferable to create a separate account) and apply for a [developer account](https://developer.twitter.com/en/apply-for-access). [Primary reason: Making a bot]
2. Describe your use case and after verification, create an App inside a Project.
3. Enable ```Read, Write, and Direct Messages``` App permissions and ```3-legged OAuth``` to generate your secrets + tokens and save immediately in ```config.js```.

## Running
```node tweetListener.js```

## Usage
1. Post a tweet by mentioning ```#niuresult```, ```#niuresultbot``` or ```@niuresultbot``` along with your roll number.
2. You then receive a screenshot of your results as a reply and a DM from the bot.