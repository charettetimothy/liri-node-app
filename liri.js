require("dotenv").config();
const Spotify = require("node-spotify-api");
const moment = require("moment");
const axios = require("axios");
const fs = require("fs");
const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify);
const liriCommand = process.argv[2];
const searchName = process.argv.slice(3).join(' ');
// const inquirer = require("inquirer");

//Switch statement - Takes in command and initiates one of the first 4 functions.
var run = function (command, search) {
    console.log(command)
    console.log(search)
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
            fsCase(search);
            break;
        default:
            console.log("This does not work!")
    }
}

//Function 1 - Ajax call function that searches spotify api by song name and returns song name, preview link and album.
const spotifyCase = (search) => {
    console.log(search)
    // search = process.argv.slice(3).join(' ');
    // var songName = search
    // for (let i = 4; i < process.argv.length; i++) {
    //     songName += '+' + process.argv[i];
    // }
    spotify
        .search({
            type: 'track',
            query: search
        })
        .then(function (response) {
            console.log(response.tracks.items.length)
            
           var numberOfItems;
           if (response.tracks.items.length < 5) { 
               numberOfItems = response.tracks.items.length
           } else {
               numberOfItems = 5;
           }
           console.log("---------Here are the top " + numberOfItems + " results!----------")
           for (let i = 0; i < 5 && i < response.tracks.items.length; i++) {
                
                if (response.tracks.items[i].preview_url) {
                    console.log(response.tracks.items[i].preview_url);
                }else {
                    console.log("no preview available")
                }              
                console.log(response.tracks.items[i].album.artists[0].name);
                console.log(response.tracks.items[i].name);
                console.log("----------------------------------------------")
            }
        })
        .catch(function (err) {
            console.log(err)
        });
};

//Function 2 - Ajax call function that searches OMDb api for a movie and displays info.
const omdbCase = (search) => {
    search = process.argv.slice(3).join(' ');
    // console.log(search)
    // for (let i = 4; i < process.argv.length; i++) {
    //     movieName += '+' + process.argv[i]
    // }
    if (!search) {
        search = "mr+nobody"
    }
    //Then run a request to the OMDB API with the movie specified
    const queryUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy";
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
const bandCase = (search) => {
    search = process.argv.slice(3).join(' ');
    // let bandName = search;
    // for (let i = 4; i < process.argv.length; i++) {
    //     bandName += '+' + process.argv[i]
    // }
    //Then run a request to the Bands In Town API with the band specified
    const queryUrl = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=ab7314c522a41c69f17770efb133611c&date=upcoming";
    //Then create a request to the queryUrl
    axios.get(queryUrl).then(
        function (response) {
            // bandResponse(response.data);
            var bandData = response.data;
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
        }
    );
    //passing bandResponse into bandData - 1. Define the function, set up any parameters. 2. Call the function(invoking)
    // function bandResponse(bandData) {
    //     if (bandData.length === 0) {
    //         console.log("Sorry there are no upcoming events for " + bandName + ".");
    //     } else {
    //         console.log("-----Here are the top 5 upcoming concerts:-----")
    //         for (let i = 0; i < 6 && i < bandData.length; i++) {
    //             console.log("-----------------------------------------------")
    //             console.log("Venue name: " + bandData[i].venue.name);
    //             console.log("Venue city: " + bandData[i].venue.city);
    //             var convertedDate = moment(bandData[i].datetime).format('MM/DD/YYYY');
    //             console.log("Date: " + (convertedDate));
    //             console.log("-----------------------------------------------")
    //         }
    //     }
    // };
};

//Function 4 - LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
const fsCase = () => {
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
