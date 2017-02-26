/* Require for API's */
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');

/* NPM package to add color */
var clc = require('cli-color');

/* Require API keys */
var js = require('./keys.js');

/* Require fs package for reading random.txt */
var fs = require("fs");

/* Place Twitter API credentials into a variable */
var tkeys = js.twitterKeys;

/* Create client of Twitter object */
var client = new Twitter({
  consumer_key: 'wArshL3ziakREGn3PGX4ljskJ',
  consumer_secret: '0tZvKkTTSzD0sgTAP9wn476fxxUaJqGpduiuuVGm9P2VaWVlwm',
  access_token_key: '823694094568488960-Mhf6WVgjFvc2XkefgrY9UnEvA0Ec7Hr',
  access_token_secret: 'xSuAHqqH68nQgBXoQtNj67dTDzOtloxjTj5etijYb19yC'
});

/* Twitter API function */
function tweet() { 

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

}; 

/* Spotify API function */ 
function search(choice_info) { 
	spotify.search({ type: 'track', query: choice_info }, function(err, data) {

    	if (err) {
        console.log('Error occurred: ' + err);
        return;

    	} 

    	var track_info = data.tracks.items[0];
    	console.log("\n");
    	console.log(clc.green("Artist: " + track_info.artists[0].name));
    	console.log(clc.blue("-------------------------------------------------"));
    	console.log(clc.green("Track Name: ") + track_info.name);
    	console.log(clc.blue("-------------------------------------------------"));
    	console.log(clc.green("Link to Preview: ") + track_info.preview_url);
    	console.log(clc.blue("-------------------------------------------------"));
    	console.log(clc.green("Album Name: ") + track_info.album.name);
    	console.log("\n");

	});

};  

/* Use Request to make an HTTP call to OMDB API */
var movie = function(choice_info) { 

	request('http://www.omdbapi.com/?t=' + choice_info + '&y=&plot=short&tomatoes=true&r=json', function (error, response, body) {

  		if (!error && response.statusCode == 200) {
  				var movie = JSON.parse(body);
    		 	console.log(clc.green("Title: ") + movie.Title);
    		 	console.log(clc.blue("-----------------------------------------------------------"));
    		 	console.log(clc.green("Released: ") + movie.Released);
    		 	console.log(clc.blue("-----------------------------------------------------------"));
    		 	console.log(clc.green("IMDB Rating: ") + movie.imdbRating);
    		 	console.log(clc.blue("-----------------------------------------------------------"));
    		 	console.log(clc.green("Country of Production: ") + movie.Country);
    		 	console.log(clc.blue("-----------------------------------------------------------"));
    		 	console.log(clc.green("Language: ") + movie.Language);
    		 	console.log(clc.blue("-----------------------------------------------------------"));
    		 	console.log(clc.green("Plot: ") + movie.Plot);
    		 	console.log(clc.blue("-----------------------------------------------------------"));
    		 	console.log(clc.green("Actors: ") + movie.Actors);
    		 	console.log(clc.blue("-----------------------------------------------------------"));
    		 	console.log(clc.green("Rotten Tomatoes Rating: ") + movie.tomatoRating);
    		 	console.log(clc.blue("-----------------------------------------------------------"));
    		 	console.log(clc.green("Rotten Tomatoes URL: ") + movie.tomatoURL);
    		 	console.log("\n");
  		}
	});

}; 

/* NPM file-system package function */
function fileHandler() {

		fs.readFile("random.txt", "utf8", function(error,data) {
				var file_choice;
				file_choice = data.split(',');
				return(makeChoice(file_choice[0], file_choice[1]));
		});
};
 

function makeChoice(choice, choice_info) {

		switch(choice) {
				case 'my-tweets':
					tweet();
					break;

				case 'movie-this':
					if(choice_info) {
							movie(choice_info);

					} else {
							movie('Mr. Nobody');
					}
					break;

				case 'spotify-this-song':
					if(choice_info) {
							search(choice_info);

					} else {
							search('The Sign Ace of Base');
					}
					break;

				case 'do-what-it-says':
						fileHandler();
						break;

				default:
					console.log("Sorry, I did not understand your input. Try again.");
					break;
		}

};

/* Pass makeChoice function command-line arguments */
makeChoice(process.argv[2], process.argv[3]);



