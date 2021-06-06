import Twit from 'twit';
import config from './config.js';

var T = new Twit(config);

var params = {
		q: '#resultbot',
		count: 5
	};

T.get('search/tweets', params, gotData);


let m;

	function gotData(err, data, response) {
		var tweets = data.statuses;

		/* Not working */
		// var name = event.source.name;
		// var screenName = event.source.screen_name;
		// console.log('Tweeted by: ' + name + ' ' + screenName);

		for(var i = 0; i < tweets.length; i++) {
			console.log(tweets[i].text + "\n--------------\n");

			const regex = /\w{2}\/\w{2}\/\d{4}\/\d{3}/gm;

			while ((m = regex.exec(tweets[i].text)) !== null) {
				// This is necessary to avoid infinite loops with zero-width matches
				if (m.index === regex.lastIndex) {
					regex.lastIndex++;
				}
				
				// The result can be accessed through the `m`-variable.
				m.forEach((match, groupIndex) => {
					console.log(`Found match, group ${groupIndex}: ${match}`);
				});
			}
		}
	}
