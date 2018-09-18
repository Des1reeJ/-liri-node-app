require("dotenv").config();
var moment = require('moment');
var request = require('request');
var fs = require('fs');
var Spotify = require('node-spotify-api');
var keys = require('./keys');
var spotify = new Spotify(keys.spotify);



var action = process.argv[2];
var search = process.argv[3];

// function ran when called liri.js 
function switchHere (action, search) {
    switch (action) {
        case 'concert-this':
            concertThis(search);
            break;
    
        case 'spotify-this-song':
            spotifyThisSong(search);
            break
        case 'movie-this':
            movieThis(search);
            break
        case 'do-what-it-says':
            doWhatItSays();
            break
}

};
switchHere(action, search);

// concert this function
function concertThis() {
    var artist = search;
    var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    request(URL, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', info); // Print the HTML for the Google homepage.

            for (i = 0; i < info.length; i++) {
                var details = info[i];
                console.log(details.venue.name);
                console.log(details.datetime);
                console.log(moment(details.datetime).format("MM/DD/YY"));


            }
        };



    });
}

// spotify-this-song function
function spotifyThisSong(song) {
    spotify.search({
        type: 'track',
        query: song
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var dataInfo = data.tracks.items
        for (var i = 0; i < dataInfo.length; i++) {
            console.log(i);
            console.log('artist: ' + dataInfo[i].artist);
            console.log('song: ' + dataInfo[i].name);
            console.log('album: ' + dataInfo[i].album.name);
            console.log('preview: ' + dataInfo[i].preview_url);
            console.log(data);
        }
    });
}

// spotifyThisSong(process.argv[2]);


// // movie-this function

function movieThis(Beaches) {
    request('http://www.omdbapi.com/?t=' + Beaches + '&y=&plot=short&apikey=trilogy', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        var info = JSON.parse(body);
        console.log('body:', info); // Print the HTML for the Google homepage.

    });
}
// movies(process.argv[2]);


// // do-what-it-says-function
function doWhatItSays() {
    fs.readFile('./random.txt', 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);
        spotifyThisSong(data);
    });
}
// doWhatItSays(); 