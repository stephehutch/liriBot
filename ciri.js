var axios = require("axios");
var moment = require('moment');
let keys = require("./keys.js")
var Spotify = require('node-spotify-api');
let fs = require('fs');
var inquirer = require("inquirer");

var spotify = new Spotify({
  id: keys.spotify.id,// <your spotify client id>,
  secret: keys.spotify.secret,//<your spotify client secret>
});


// Store all of the arguments in an array
var nodeArgs = process.argv;


function getMovie(movie) {
  // Then run a request to the OMDB API with the movie specified
  var movieUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

  // This line is just to help us debug against the actual URL.

  axios.get(movieUrl).then(
    function (response) {

      // Parse the body of the site and recover just the imdbRating
      console.log("Title: " + response.data.Title);
      // Rease Year
      console.log("Release Year: " + response.data.Year);
      //Rating on imbd
      console.log("IMBD Rating: " + response.data.imdbRating);
      //Rating on rotten tomatos
      console.log("Tomatoes Rating: " + response.data.Ratings[1].Value);
      // Country where the movie was produced.
      console.log('Country: ' + response.data.Country);
      // Language of the movie.
      console.log('Language: ' + response.data.Language);
      //  * Actors in the movie.
      console.log('Actors: ' + response.data.Actors);
      //  * Plot of the movie.
      console.log('Plot: ' + response.data.Plot);

    });
}

function getBand(band) {
  // Then run a request to the OMDB API with the movie specified
  var artistUrl = "https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp";

  axios.get(artistUrl).then(
    function (response) {
      // This line is just to help us debug against the actual URL.

      // If the request is successful

      for (j = 0; j < response.data.length; j++) {

        let showtime = response.data[j].datetime
        console.log(band + ' will preform at the '
          + response.data[j].venue.name + ' in '
          + response.data[j].venue.city + ', '
          + response.data[j].venue.region + ' ('
          + response.data[j].venue.country + ') on '
          + moment(showtime).format('L'))
      }

    });
}

function getSong(song) {
  spotify
    .search({ type: 'track', query: song })
    .then(function (response) {
      //console.log(response.tracks.items[0]);
      console.log('Song: ' + response.tracks.items[0].name);
      console.log('Album: ' + response.tracks.items[0].album.name);
      console.log('Artist(s): ' + response.tracks.items[0].artists[0].name);
      console.log('Check it out: ' + response.tracks.items[0].preview_url);
      return
    })
    .catch(function (err) {
      console.log(err);
    });
}

// Prompt the user to provide location information.
inquirer.prompt([
  {
    type: "list",
    name: "request",
    message: "What would you like to know about?",
    choices: ["A Movie", "A Song", "A Band", "I'm not sure"]
  },
    {
      type: "input",
      name: "thing",
      message: "Inout the name of the thing you would like to know about. If you were not sure press enter to skip."
    }

  
  // After the prompt, store the user's response in a variable called location.
  ]).then(function(userInput) {
  
    if (userInput.request === "I'm not sure") {
      fs.readFile('random.txt', 'utf8', function (error, data) {
        //console.log(data)
    
        var dataArray = data.trim().split(',');
    
        let input = dataArray[0]
        nodeArgs = dataArray[1]
    
        if (input === 'movie-this') {
          getMovie(nodeArgs)
        } else if (input === "spotify-this-song") {
          getSong(nodeArgs)
        } else if (input === "concert-this") {
          getBand(nodeArgs)
        }
      });
    } 
    
    else if (userInput.request === 'A Movie') {

      // Create an empty variable for holding the movie name
      var movieName = userInput.thing;
    
      getMovie(movieName)
    
    } else if (userInput.request === "A Band") {
      // console.log('This feature is comming soon.')
      let artist = userInput.thing;
    
        getBand(artist)
    
    
    } else if (userInput.request === "A Song") {
    
      let song = userInput.thing
   
        getSong(song)
    
    } 
  });
  









