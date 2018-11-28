require("dotenv").config();
const Spotify = require("node-spotify-api");
const moment = require("moment");
const axios = require("axios");
const fs = require("fs");
const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify);
const liriCommand = process.argv[2];

//switch statement - takes in command and initiates one of the first 3 functions
switch (liriCommand) {
    case "spotify-this-song":
        spotifyCase();
        break;
    case "movie-this":
        omdbCase();
        break;
    case "concert-this":
        bandCase();
        break;
    default:
        console.log("This does not work!")
}

//function1 - ajax call function that searches spotify api by artist name
function spotifyCase() {
    var songName = process.argv[3]
    for (let i = 4; i < process.argv.length; i++) {
        songName += '+' + process.argv[i];
    }
    spotify
        .search({
            type: 'track',
            query: songName
        })
        .then(function (response) {
            console.log(response.tracks);
        })
        .catch(function (err) {
            console.log(err)
        });
    console.log(songName)
};

//function2 - ajax call function that searches omdb api movie name
function omdbCase() {
    var movieName = process.argv[3];
    for (let i = 4; i < process.argv.length; i++) {
        movieName += '+' + process.argv[i]
    }
    console.log(movieName)
    //Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    //This line is just to help us debug against the actual URL.
    console.log(queryUrl);
    //Then create a request to the queryUrl
    axios.get(queryUrl).then(
        function (response) {
            console.log('Title: ' + response.data.Title);
            console.log('Year: ' + response.data.Year);
            console.log('IMDB Rating: ' + response.data.imdbRating);
            console.log('Rotten Tomatos Rating: ' + response.data.Year);
            console.log('Country: ' + response.data.Country);
            console.log('Language: ' + response.data.Language);
            console.log('Plot: ' + response.data.Plot);
            console.log('Actors: ' + response.data.Actors);
        }
    );
};

//function3 - ajax call function that searches bands in town api by artists and returns venue, location, date of event
function bandCase() {
    let bandName = process.argv[3];
    for (let i = 4; i < process.argv.length; i++) {
        bandName += '+' + process.argv[i]
    }
    console.log(bandName)
    //Then run a request to the Bands In Town API with the band specified
    let queryUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=ab7314c522a41c69f17770efb133611c&date=all";
    console.log(queryUrl);
    //Then create a request to the queryUrl
    axios.get(queryUrl).then(
        function (response) {
            // console.log(response.data);
            bandResponse(response.data);
        }
    );
    //this is how i pass response into bandData 
    //2 parts - define the function set up any (placeholder)parameters, call the function(invoking)
    function bandResponse(bandData) {
        // console.log(bandData)
        if (bandData.length === 0) {
            console.log("Sorry there are no upcoming events for " + bandName + " .");
        } else {
            for (let i = 0; i < 6 && i < bandData.length; i++) {
                console.log("Venue name: " + (bandData[i]).venue.name);
                console.log("Venue city: " + (bandData[i]).venue.city);
                console.log("Date & Time: " + (bandData[i]).datetime);
            }
        }
    };
};