var T = new Twit(config);

var stream = T.stream('statuses/filter', { track: '#resultbot' });
stream.on('tweet', function tweet() {
    console.log(tweet.text);
});