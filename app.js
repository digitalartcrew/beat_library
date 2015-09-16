var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  db = require('./models');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true})); //post
app.use(methodOverride('_method'));// Put and Delete 


//Get the home application page
app.get('/', function(req,res){
	db.Track.find({}, function(err, tracks){
		if (err){
			console.log(err);
		} 
		res.render('index',{tracks: tracks});
	});
});

// To get a form to save a new track
app.get('/tracks/new', function (req,res){
	res.render('tracks/new');
});

//To save a new track
app.post('/tracks', function (req,res){
  db.Track.create(req.body.track, function(err, track){
    if(err){
      var errorText = "Title can't be blank";
      res.render("tracks/new", {error: errorText});
    } else {
      res.redirect("/");
    }
  });
});

//To Find a track by ID and display info
app.get('/tracks/:id', function (req, res){
	db.Track.findById(req.params.id, function(err, foundTrack){
    if(err){
      res.render("404");
    } else {
      res.render('tracks/show', {track: foundTrack});
    }
  });

});

//Update page for specific track information on page
app.get('/tracks/update/:id', function (req, res){
 db.Track.findById(req.params.id, function(err, foundTrack){
    if(err){
      res.render("404");
    } else {
      res.render('tracks/update', {track:foundTrack});
    }
  });
});

//Update info and redirect
app.put('/tracks/:id', function (req, res){
 db.Track.findByIdAndUpdate(req.params.id, req.body.track,  function(err, track){
  if(err){
    res.render("404");
  } else{
    res.redirect('/');
  }
 });
});

//Delete a track
app.delete('/tracks/:id', function (req, res){
  db.Track.findByIdAndRemove(req.params.id, function(err, track){
    if(err){
      res.render("404");
    } else{
      res.redirect('/');
    }
  });
});


//Sort Array
app.put('/sort', function(req,res){
db.tracks.find().sort( { name: -1 } );
});

//Additonal Application
app.get('/about', function (req, res){
	res.render('site/about');
});

app.get('/contact', function ( req, res){
	res.render('site/contact');
});

app.listen(3000, function(){
	console.log("Server running on port 3000");
});