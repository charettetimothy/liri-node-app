require("dotenv").config();
const Spotify = require("node-spotify-api");
const moment = require("moment");
const axios = require("axios");
const fs = require("fs");
const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify);
const liriCommand = process.argv[2];

//switch statement - takes in command and initiates one of the first 4 functions
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
    case "do-what-it-says":
        fsCase();
        break;
    default:
        console.log("This does not work!")
}

//function1 - ajax call function that searches spotify api by artist name
//and returns song name, preview link of the song from spotify and album the song is from.
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
            // console.log(response.tracks.items[0].album.artists[0].external_urls.spotify);
            // console.log(response.tracks.items[0].album.artists[0].external_urls.spotify);
            // console.log(response.tracks.items[0].album.artists[0].name);
            console.log(response.tracks.items[0].name);
        })
        .catch(function (err) {
            console.log(err)
        });
    console.log(songName)
};

//function2 - ajax call function that searches omdb api for a movie and displays title, year,
//IMDB rating, country, language, plot and actors.
function omdbCase() {
    var movieName = process.argv[3];
    for (let i = 4; i < process.argv.length; i++) {
        movieName += '+' + process.argv[i]
    }

    if (!movieName) {
        movieName = "mr+nobody"
    }
    //Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    // const mrNobody = "http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy";
    //Then create a request to the queryUrl

    axios.get(queryUrl).then(
        function (response) {
            console.log("---Here is your requested movie information---")
            console.log('Title: ' + response.data.Title);
            console.log('Year: ' + response.data.Year);
            console.log('IMDB Rating: ' + response.data.imdbRating);
            console.log('Country: ' + response.data.Country);
            console.log('Language: ' + response.data.Language);
            console.log('Plot: ' + response.data.Plot);
            console.log('Actors: ' + response.data.Actors);
            console.log("---------------------------------")
            // if (movieName === undefined) {
            //     axios.get(mrNobody).then(
            //         function (response) {
            //             console.log("-----Fine! I will pick a movie for you!-----")
            //             console.log('Title: ' + response.data.Title);
            //             console.log('Year: ' + response.data.Year);
            //             console.log('IMDB Rating: ' + response.data.imdbRating);
            //             console.log('Country: ' + response.data.Country);
            //             console.log('Language: ' + response.data.Language);
            //             console.log('Plot: ' + response.data.Plot);
            //             console.log('Actors: ' + response.data.Actors);
            //             console.log("----------You are welcome!-------------")
            //         }
            //     )
            // }
        }
    );
};

//function3 - ajax call function that searches bands in town api by artists and returns venue, location, date of event
function bandCase() {
    let bandName = process.argv[3];
    for (let i = 4; i < process.argv.length; i++) {
        bandName += '+' + process.argv[i]
    }
    //Then run a request to the Bands In Town API with the band specified
    const queryUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=ab7314c522a41c69f17770efb133611c&date=upcoming";
    //Then create a request to the queryUrl
    axios.get(queryUrl).then(
        function (response) {
            bandResponse(response.data);
        }
    );
    //this is how i pass response into bandData 
    //2 parts - define the function set up any (placeholder)parameters, call the function(invoking)
    function bandResponse(bandData) {
        if (bandData.length === 0) {
            console.log("Sorry there are no upcoming events for " + bandName + ".");
        } else {
            console.log("-----Here are the top 5 upcoming concerts:-----")
            for (let i = 0; i < 6 && i < bandData.length; i++) {
                console.log("-----------------------------------------------")
                console.log("Venue name: " + bandData[i].venue.name);
                console.log("Venue city: " + bandData[i].venue.city);
                var convertedDate = moment(bandData[i].datetime).format('MM/DD/YYYY');
                console.log("Date: " + (convertedDate));
                console.log("-----------------------------------------------")
            }
        }
    };
};

function fsCase() {
    fs.readFile("random.txt", "utf-8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        console.log(data);
    });
}