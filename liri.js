/* Require for API's */
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');

/* NPM package to add color */
var clc = require('cli-color');

/* Require API keys */
var js = require('./keys.js');

/* Place Twitter API credentials into a variable */
var tkeys = js.twitterKeys;

/* Create client of Twitter object */
var client = new Twitter({
  consumer_key: 'wArshL3ziakREGn3PGX4ljskJ',
  consumer_secret: '0tZvKkTTSzD0sgTAP9wn476fxxUaJqGpduiuuVGm9P2VaWVlwm',
  access_token_key: '823694094568488960-Mhf6WVgjFvc2XkefgrY9UnEvA0Ec7Hr',
  access_token_secret: 'xSuAHqqH68nQgBXoQtNj67dTDzOtloxjTj5etijYb19yC'
});

/* Functions to communicate with APIs */
var params = {screen_name: 'RU_Patrick001'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {

		var i = 0;
		for(i = 0; i < 5; i++) {
				console.log(clc.green(tweets[i].user.screen_name) + clc.green(":"));
				console.log(clc.blue("Tweeted: ") + tweets[i].text);
				console.log(clc.blue("Tweeted at: ") + tweets[i].created_at);
				console.log("\n");
		}
 
});
