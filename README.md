# liri
 liri stands for Language Interpretation and Recognition Interface
 
## Required packages
Please install these packages: 
axios, node-spotify-api, moment, fs

also please put spotify keys in a let keys.js file to call the spotify api.


## To use liri:
  The second argument can be the name of any song, movie, or  band.
  The first argument can be any of the following:
    movie-this (if you are searching for a movie)
    concert-this (if you search for a band)
    spotify-this-song (if you search for a song)
    do-what-it-says (no second argument)

    
## Test cases for liri
  node liri.js movie-this coco 
  node liri.js concert-this Pentatonix 
  node liri.js spotify-this-song high of 75
  node liri.js do-what-it-says

Ciri
----
ciri stands for Console Interpretation and Recognition Interface |

additional required packages: inquirer |


ciri.js will prompt the user in the console with four search options: a song, a movie, a band, or "I'm not sure." Ciri will then prompt the user to input their query term or skip (eg. song title)

 
