require("dotenv").config();
const Spotify = require("node-spotify-api");
const moment = require("moment");
const axios = require("axios");
const fs = require("fs");
const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify);


//-helper functions
//-function1 - ajax call function that searches spotify api by artist name
// var songName = process.argv[2];
//  for (let i = 3; i < process.argv.length; i++) {
//      songName += '+' + process.argv[i]
// }
// spotify
//   .search({ type: 'track', query: songName })
//   .then(function(response) {
//     console.log(response.tracks);
//   })
//   .catch(function(err) {
//     console.log(err);
//   });
// console.log(artistName)
//Then run a request to the OMDB API with the movie specified
//var queryUrl = "http://www.omdbapi.com/?t=" + artistName + "&y=&plot=short&apikey=trilogy";
//This line is just to help us debug against the actual URL.
//console.log(queryUrl);
//Then create a request to the queryUrl
// axios.get(queryUrl).then(
//  function (response) {
//  console.log(response)
//  }
// );

// //function2 - ajax call function that searches omdb api movie name
// var movieName = process.argv[2];
// for (let i = 3; i < process.argv.length; i++) {
//     movieName += '+' + process.argv[i]
// }
// console.log(movieName)
// //Then run a request to the OMDB API with the movie specified
// var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
// //This line is just to help us debug against the actual URL.
// console.log(queryUrl);
// //Then create a request to the queryUrl
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

//function3 - ajax call function that searches bands in town api by artists and returns venue, location, date of event
let bandName = process.argv[2];
for (let i = 3; i < process.argv.length; i++) {
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
    console.log(bandData)
    if (bandData.length === 0) {
        console.log("no upcoming shows for" + bandName)
    } else {
        for (let i = 0; i < 5 && i < bandData.length; i++) {
            console.log((bandData[i]).venue.name)
            console.log((bandData[i]).venue.city)
            console.log((bandData[i]).datetime)
        }
    }};


    // function4 - takes in command and initiates one of the first 3 functions, use switch or case statement to decide which function to use
    // get command from the command line assign to variable and use that variable to trigger switch statement