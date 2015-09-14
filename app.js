var express = require('express'),
  app = express(),
  bodyParser = require('body-parser');
  methodOverride = require('method-override');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true})); //post
app.use(methodOverride('_method'));// Put and Delete 

//Set initial ID
var id = 4;

//Created track array
var tracks = [{title: "Bassy", author: "Dizzy D", year: 2015, id: 1, url: "http://developer.mozilla.org/@api/deki/files/2926/=AudioTest_(1).ogg"},
{title: "Chicago", author: "Bizzy D", year: 2012, id: 2, url: "http://developer.mozilla.org/@api/deki/files/2926/=AudioTest_(1).ogg"},
{title: "The Bay", author: "Susie B", year: 2014, id: 3, url: "http://developer.mozilla.org/@api/deki/files/2926/=AudioTest_(1).ogg"}
];

function Track(title, author, year, url, id){
	this.title =title;
	this.author=author;
	this.year=year;
	this.url=url;
	this.id=id;
}

//Get the home application page
app.get('/', function(req,res){
	res.render('index',{tracks: tracks});
});

// To get a form to save a new track
app.get('/tracks/new', function (req,res){
	res.render('tracks/new');
});

//To save a new track
app.post('/tracks', function (req,res){
	tracks.push(new Track(req.body.track_title, req.body.track_author, req.body.track_year, req.body.track_url, id));
	id++;
	res.redirect('/');
});

//To Find a track by ID and display info
app.get('/tracks/:id', function (req, res){
	var id = req.params.id;
	var currenttrack;
	tracks.forEach(function(track){
		if( parseInt(id) === track.id){
			currenttrack = track;
			console.log("Found Match");
			res.render("tracks/show", {track: track});
		} 
	});

});

//Update page for specific track information on page
app.get('/tracks/update/:id', function (req, res){
		var id = req.params.id;
		var currentTrack;
		tracks.forEach(function(track){
		if( parseInt(id) === track.id){
			currentTrack = track;
			console.log("Found Match");
			res.render("tracks/update", {track: track});
		} 
	});
});

//Update info and redirect
app.put('/tracks/update/:id', function (req, res){
	var id = req.params.id;
	var currentTrack;
	var trackTitle = req.body.track_title;
	var trackAuthor = req.body.track_author;
	var trackYear = req.body.track_year;
	var trackUrl = req.body.track_url;
	tracks.forEach(function(track){
		if( parseInt(id) === track.id){
			currentTrack = track;
			console.log("Found Match!");
			
		} else {
			res.render("404");
		} 
	currentTrack.title = trackTitle;
	currentTrack.author = trackAuthor;
	currentTrack.age = trackYear;
	currentTrack.image = trackUrl;
	res.redirect('/');

	});
});

//Delete a track
app.delete('/tracks/:id', function (req, res){
	var id = req.params.id;
	tracks.forEach(function(track, index){
		if( parseInt(id) === track.id){
			tracks.splice(index, 1);		
		} 
	});
		res.redirect('/');
});

//Catch All
app.get('*', function(req,res){
	res.render('404');
});

//Sort Array
app.put('/sort', function(req,res){
	tracks.sort(function(a,b){
		if (a.title > b.title) {
    return 1;
  }
  if (a.title < b.title) {
    return -1;
  }
  // a must be equal to b
  return 0;

	});
	res.redirect('/');
});

//Additonal Application
app.get('/about', function (req, res){
	res.render('site/about', {tracks: tracks});
});

app.get('/contact', function ( req, res){
	res.render('site/contact', {tracks: tracks});
});

app.listen(3000, function(){
	console.log("Server running on port 3000");
});