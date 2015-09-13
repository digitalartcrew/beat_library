var express = require('express'),
  app = express(),
  bodyParser = require('body-parser');
  methodOverride = require('method-override');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true})); 
app.use(methodOverride('_method'));

//Set initial ID
var id = 2;

//Created track array
var tracks = [{title: "Demo Dude", author: "Donteezy", year: 2015, id: id, url: "http://developer.mozilla.org/@api/deki/files/2926/=AudioTest_(1).ogg"}];

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
	var trackTitle= req.body.track_title;
	var trackAuthor = req.body.track_author;
	var trackYear = req.body.track_year;
	var trackUrl = req.body.track_url;
	tracks.push({title: trackTitle, author: trackAuthor, year: trackYear, id: id, url: trackUrl});
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

//Additonal Application
app.get('/about', function (req, res){
	res.render('about', {tracks: tracks});
});

app.get('/contact', function ( req, res){
	res.render('contact', {tracks: tracks});
});

app.listen(3000, function(){
	console.log("Server running on port 3000");
});