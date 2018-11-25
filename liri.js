require("dotenv").config(); 
const Spotify = require("node-spotify-api");
const moment = require("moment");
const axios = require("axios");
const fs = require("fs");
const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify);


// helper functions
// function1 - ajax call function that searches spotify api by artist name
// var queryurl
// then
// function2 - ajax call function that searches omdnb api song name
// function3 - ajax call function that searches bands in town api by artists and returns venue, location, date of event
// function4 - takes in command and initiates one of the first 3 functions, use switch or case statement to decide which function to use
// get command from the command line assign to variable and use that variable to trigger switch statement