var command = process.argv[2];
var action = process.argv[3];
var spotify = require('spotify');
var Twitter = require('twitter');
var keys = require("./keys.js");
var fs = require('fs');

function twitterText() {
var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});
 
var params = {screen_name: "ParkJustin"};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
  	for (var i = 0; i < tweets.length; i++) {
  		var twits = "\n============== " + tweets[i].created_at + " ==============\n" +  "\n" + tweets[i].text + "\n" + "\n============================================================\n"
		   console.log(twits)


		fs.appendFile("log.txt", twits, function(error){
  	  	if (error) {
		   console.log(error)
  		};

  	});
    
  };
};

  if (error) {
	console.log(error)
  }


});

};


function spotifySong(action) {
	if (action === undefined) {
		action  = "the sign, the ace of base"
	}

spotify.search({type: 'track', query: action}, function(error, data) {
    if (error) {
        console.log('Error occurred: ' + error);
        return;
    }
 	
 	var songInfo = "\n============================================================\n"
 		+ "\nSong: "+ data.tracks.items[0].name + "\n"
 	    + "\n============================================================\n"
    	+ "\nArtist: " + data.tracks.items[0].artists[0].name + "\n"
    	+ "\n============================================================\n"
    	+ "\nPreview URL: " + data.tracks.items[0].preview_url + "\n"
    	+ "\n============================================================\n"
    	+ "\nAlbum: " + data.tracks.items[0].album.name + "\n"
    	+ "\n============================================================\n"
    	console.log(songInfo);
    	fs.appendFile("log.txt", songInfo, function(error){
  	  	if (error) {
		   console.log(error)
  		};

  	});
});

}


function searchMovie(action){
var request = require('request');
if (action === undefined) {
	action = "Mr.+Nobody";
}
    var queryURL = "http://www.omdbapi.com/?tomatoes=true&t=" + action;

	request(queryURL, function (error, response, body) {
	  if (error && response.statusCode !== 200) {
	  	console.log('Error occurred: ' + error);
	  }

	  if (!error && response.statusCode == 200) {
	  	body = JSON.parse(body)
	  	var movieInfo = 
	    "\nTitle: " + body.Title + "\n"
	    + "\nYear: " + body.Year + "\n"
	    + "\nimdbRating: " + body.imdbRating + "\n"
	    + "\nCountry: " + body.Country + "\n"
	    + "\nLanguage: " + body.Language + "\n"
	    + "\nPlot: " + body.Plot + "\n"
	    + "\nActors: " + body.Actors + "\n"
	    + "\nRotten Tomatoes Rating: " + body.tomatoRating + "\n"
	    + "\nRotten Tomatoes URL: (" + body.tomatoURL + ")" + "\n"
	  }

	    console.log(movieInfo);
    	fs.appendFile("log.txt", movieInfo, function(error){
  	  	if (error) {
		   console.log(error)
  		};

  	});

	});

};
function doWhat() {
	fs.readFile("random.txt", "utf8", function(err, data) {
    var array = data.split(",");
    if (array[0] === 'my-tweets'){
    	twitterText();
    	return;
    }

    else if(array[0] === 'spotify-this-song') {
    	spotifySong(array[1]);
    	return;
    }

    else if(data[0] === 'movie-this'){
    	searchMovie(data[1]);
    	return;
    }		
  		});
		
}

switch (command) {
	case "my-tweets":
	twitterText();
	break;

	case "spotify-this-song":
	spotifySong();
	break;

	case "movie-this":
    searchMovie();
    break;

    case "do-what-it-says":
    doWhat();
    break;
} 

