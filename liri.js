require("dotenv").config();
const Spotify = require("node-spotify-api");
const moment = require("moment");
const axios = require("axios");
const fs = require("fs");
const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify);


// -helper functions
// -function1 - ajax call function that searches spotify api by artist name
// -function2 - ajax call function that searches omdnb api movie name
// var movieName = process.argv[2];
// for (let i = 3; i < process.argv.length; i++) {
//     movieName += '+' + process.argv[i]
// }
// -console.log(movieName)
// -Then run a request to the OMDB API with the movie specified
// var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
// -This line is just to help us debug against the actual URL.
// -console.log(queryUrl);
// -Then create a request to the queryUrl
// axios.get(queryUrl).then(
//     function (response) {
//         console.log('Title: ' + response.data.Title);
//         console.log('Year: ' + response.data.Year);
//         console.log('IMDB Rating: ' + response.data.imdbRating);
//         console.log('Rotten Tomatos Rating: ' + response.data.Year);
//         console.log('Country: ' + response.data.Country);
//         console.log('Language: ' + response.data.Language);
//         console.log('Plot: ' + response.data.Plot);
//         console.log('Actors: ' + response.data.Actors);
//     }
// );
// -function3 - ajax call function that searches bands in town api by artists and returns venue, location, date of event
var artistName = process.argv[2];
for (let i = 3; i < process.argv.length; i++) {
    artistName += '+' + process.argv[i]
}
// -console.log(movieName)
// -Then run a request to the OMDB API with the movie specified
var queryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";
// -This line is just to help us debug against the actual URL.
// -console.log(queryUrl);
// -Then create a request to the queryUrl
axios.get(queryUrl).then(
    function (response) {
        console.log(response);
        // console.log('Title: ' + response.data.Title);
        // console.log('Year: ' + response.data.Year);
        // console.log('IMDB Rating: ' + response.data.imdbRating);
        // console.log('Rotten Tomatos Rating: ' + response.data.Year);
        // console.log('Country: ' + response.data.Country);
        // console.log('Language: ' + response.data.Language);
        // console.log('Plot: ' + response.data.Plot);
        // console.log('Actors: ' + response.data.Actors);
    }
);
// function4 - takes in command and initiates one of the first 3 functions, use switch or case statement to decide which function to use
// get command from the command line assign to variable and use that variable to trigger switch statement