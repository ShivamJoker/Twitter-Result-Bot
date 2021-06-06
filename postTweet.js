import Twit from 'twit';
import config from './config.js';

var T = new Twit(config);

var tweet = {
	status: 'Second test for #resultbot from Node, including AB/CD/2000/017!'
};

T.post('statuses/update', tweet, tweeted);

function tweeted(err, data, response) {
	console.log(data);
}
