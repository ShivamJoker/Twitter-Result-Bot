import { TwitterClient } from "twitter-api-client";
import fs from "fs/promises";
import config from "./config.js";
import { takeScreenshot } from "./utils.js";
const t = new TwitterClient(config);

/**
 * Send a direct message to user with media
 * @param {string} user_id Twitter user id
 * @param {string} media_id Media Id
 */
const sendDM = async (user_id, media_id) => {
  const res = await t.directMessages.eventsNew({
    event: {
      type: "message_create",
      message_create: {
        target: {
          recipient_id: user_id,
        },
        message_data: {
          text: "test from nodejs",
          attachment: {
            type: "media",
            media: { id: media_id },
          },
        },
      },
    },
  });
  return res;
};

/**
 * Upload image on twitter.
 * @param {string} path Path of the image
 * @returns {Promise} media_id
 */
const uploadMedia = async (path) => {
  const { media_id_string } = await t.media.mediaUpload({
    media: await fs.readFile(path, { encoding: "base64" }),
  });
  // delete the screenshot after uploading
  await fs.unlink(path);
  return media_id_string;
};

/**
 * Replay to a particular tweet.
 *
 * @param {string} rollno
 * @param {string} tweetid
 * @param {string} username
 */
const replyToTweet = async (rollno, tweetid, username) => {
  console.log("id", username, "roll", rollno);
  try {
    const screenshot_path = await takeScreenshot(rollno);
    const media_id = await uploadMedia(screenshot_path);
    const res = await t.tweets.statusesUpdate({
      status: `Here is your result @${username}`,
      in_reply_to_status_id: tweetid,
      media_ids: media_id,
      auto_populate_reply_metadata: true,
    });
    return res;
  } catch (err) {
    console.error(err);
  }
};

export default replyToTweet;
