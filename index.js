//importing express & morgan 
const express = require('express');
const bodyParser = require('body-parser');
uuid = require('uuid');
const morgan = require('morgan');
const mongoose = require('mongoose');
// const {Movie, User} = require('./models.js');
const Models = require('./models.js');
const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director; 

mongoose.connect('mongodb://127.0.0.1:27017/movies_couch' , {useNewUrlParser: true, useUnifiedTopology: true});
const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(morgan('common'));
app.use(bodyParser.urlencoded({
    extended:true
}));
// let auth = require('./auth')(app);
// const passport = require ('passport');
// require('./passport');

// log request to server


// get requests- default text response
app.get("/", (req, res) => {
    res.send("Welcome to Movies-couch!");
});

//returns the API documentation
app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', {root:__dirname});
});

// return JSON object when at /movies
app.get("/movies", /* passport.authenticate('jwt', {session: false}), */
(req, res) => {
    Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: "+ err);
    })
  });

// get JSON movie info when looking for specific title
app.get("/movies/:title", (req, res) => {
    Movies.findOne({Title:  req.params.title})
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
    console.error(err);
    res.status(404).send("Error: " + err);
  });
});

// genre JSON genre info when looking for specific genre
app.get("/movies/genre/:genre", (req, res) => {
    Movies.findOne({"Genre.Name": req.params.name})
    .then((genre) => {
      res.json(genre.Description);
    }) 
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
  });

// get info on Director when looking for specific Director
app.get("/movies/director/:director/", (req, res) => {
    Movies.findOne({"Director.Name": req.params.name })
    .then((director) => {
      res.json(director);
    })
    .catch((err) => {
      console.error();
      res.status(500).send("Error: " + err);
    }) 
  });


//  GET-all users
app.get("/users", (req,res) => {
    Users.find().then((users) => {
        res.status(201).json(users);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send("Error: "+ err);
    });
}); 

// --GET one user
app.get("/user/:Username", (req,res) => {
    Users.findOne({Username: req.params.Username })
    .then((user) => {res.json(user);
    })
    .catch((err) => { console.error(error);
        res.status(500).send("Error: "+ error);
    });
});

// --FindOne & Update - allow users to update their user info
app.put("/users/:Username", (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username},
    {$set:{
        Usernam: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
    }
    },
    { new:true }, //This line makes sure that the updated document is returned
    (err, updatedUser) => {
        if(err) {
            console.error(err);
            res.status(500).send("Error: "+ err);
        } else {
            res.json(updatedUser);
        }
    });
}); 


   // -- POST
app.post("/users", (req,res) => {
    Users.findOne({Username: req.body.Username}).then((user) =>{
    if (user) {
        return res.status(400).send(req.body.Username+ "already exists");
    }  else {
        Users.create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
        })
        .then((user) => {
          res.status(201).json(user)
         })
        .catch((err) => {
            comnsole.error(err);
            res.status(500).send("Error: "+ err);
            })
        }  
    })
    .catch((error))
});

// --POST a movie to user Favorite Movies
app.post("/users/:Username/movies/:MovieID", (req,res) => {
    Users.findOneAndUpdate({ usernam: req.params.Username}, {$push:{ FavoriteMovies: req.params.MovieID} 
    },
    {new:true}, //This line makes sure that the updated document is returned
    (err, updatedUser) => {
        if(err) {
            console.error(err);
            res.status(500).send("Error: "+ err);
        } else {
            res.json(updatedUser)
        }
    });
});

// --DELETE remove a movie from Favorite Movies
app.delete("/users/:Username/movies/:MovieID", (req,res) => {
    Users.findOneAndUpdate({ usernam: req.params.Username},
      {$pull:{ FavoriteMovies: req.params.MovieID} },
    {new:true}, //This line makes sure that the updated document is returned
    (err, updatedUser) => {
        if(err) {
            console.error(err);
            res.status(500).send("Error: "+ err);
        } else {
            res.json(updatedUser)
        }
    });
});

// --DELETE user by username- allow user to deregister
app.delete("/users/:Username", (req,res) => {
  Users.findOneAndRemove({ Username: req.params.Username})
  .then((user) => {
    if(!user) {
      res.status(400).send(req.params.Username + "was not found");
    } else { res.status(200).send(req.params.Username + "was deleted!");
   }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error: "+ err);
  });
});



//error handling
app.use((err, req, res, next) =>{
console.error(err.stack);
res.status(500).send("Something broke!")
});
//listen for request
app.listen(8080, () => {
    console.log("Your app is listening to port 8080.")
});
