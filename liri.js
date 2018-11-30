require("dotenv").config();
const Spotify = require("node-spotify-api");
const moment = require("moment");
const axios = require("axios");
const fs = require("fs");
const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify);
const liriCommand = process.argv[2];
const searchName = process.argv[3];

//Switch statement - Takes in command and initiates one of the first 4 functions.
var run = function (command, search) {
    switch (command) {
        case "spotify-this-song":
            spotifyCase(search);
            break;
        case "movie-this":
            omdbCase(search);
            break;
        case "concert-this":
            bandCase(search);
            break;
        case "do-what-it-says":
            fsCase();
            break;
        default:
            console.log("This does not work!")
    }
}

//Function 1 - Ajax call function that searches spotify api by song name and returns song name, preview link and album.
function spotifyCase(search) {
    var songName = search
    for (let i = 4; i < process.argv.length; i++) {
        songName += '+' + process.argv[i];
    }
    spotify
        .search({
            type: 'track',
            query: songName
        })
        .then(function (response) {
            console.log(response.tracks.items[0].album.artists[0].external_urls.spotify);
            console.log(response.tracks.items[0].album.artists[0].name);
            console.log(response.tracks.items[0].name);
        })
        .catch(function (err) {
            console.log(err)
        });
};

//Function 2 - Ajax call function that searches omdb api for a movie and displays info.
function omdbCase(search) {
    var movieName = search;
    for (let i = 4; i < process.argv.length; i++) {
        movieName += '+' + process.argv[i]
    }
    if (!movieName) {
        movieName = "mr+nobody"
    }
    //Then run a request to the OMDB API with the movie specified
    const queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
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
        }
    );
};

//Function 3 - Ajax call function that searches bands in town api by artists and returns venue, location, date of event.
function bandCase(search) {
    let bandName = search;
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
    //passing bandResponse into bandData - 1. Define the function, set up any parameters. 2. Call the function(invoking)
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

//Function 4 - LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
function fsCase() {
    fs.readFile("random.txt", "utf-8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        dataSplit = data.split(",");
        var dataUno = dataSplit[0];
        var dataDos = dataSplit[1];
        run(dataUno, dataDos);
    });
}

run(liriCommand, searchName);