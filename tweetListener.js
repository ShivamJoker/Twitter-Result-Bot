import Twitter from "twitter-lite";
import config from "./config.js";
import replyToTweet from "./reply.js";
import { parseRoll } from "./utils.js";

const timeout = 31000;
let timeLastResponseReceived;

const client = new Twitter({
  consumer_key: config.apiKey, // from Twitter.
  consumer_secret: config.apiSecret, // from Twitter.
  access_token_key: config.accessToken, // from your User (oauth_token)
  access_token_secret: config.accessTokenSecret, // from your User (oauth_token_secret)
});

const parameters = {
  track: "#niuresult, #niuresultbot, @niuresultbot",
};

const handleTweet = async ({ text, id_str, user, retweeted }) => {
  if (retweeted) return;
  const roll = parseRoll(text);
  if (!roll) return;
  const res = await replyToTweet(roll, id_str, user.screen_name);
  console.log("Tweet sent", res.text);
};

async function sleep(delay) {
  return new Promise((resolve) => setTimeout(() => resolve(true), delay));
}

const stream = client
  .stream("statuses/filter", parameters)
  .on("start", (response) => {
    console.log("start");
    // Stall handling
    const intervalId = setInterval(function () {
      if (Date.now() - timeLastResponseReceived > timeout) {
        console.log("timeout");
        clearInterval(intervalId);
      }
    }, timeout);
  })
  .on("data", handleTweet)
  .on("ping", () => console.log("ping"))
  .on("error", (error) => console.log("error", error))
  .on("end", (response) => console.log("end"));
