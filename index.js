//importing express & morgan  
const express = require("express");
const bodyParser = require("body-parser");
uuid = require("uuid");
const morgan = require("morgan");
const mongoose = require("mongoose");

const Models = require("./models.js");
const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director; 

mongoose.connect("mongodb+srv://hermann17:Chispa17@movies-couch-api.fyn8ikd.mongodb.net/?retryWrites=true&w=majority" , {useNewUrlParser: true, useUnifiedTopology: true}); 
const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(morgan("common"));
app.use(bodyParser.urlencoded({
    extended:true
}));

const cors = require ("cors");
app.use(cors());
let auth = require("./auth")(app);
const passport = require ("passport");
require("./passport");
const {check, validationResult } = require("express-validator");


// get requests- default text response
app.get("/", (req, res) => {
    res.send("Welcome to Movies-couch!");
});

//returns the API documentation
app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', {root:__dirname});
});

// return JSON object when at /movies
app.get("/movies", passport.authenticate('jwt', {session: false}), 
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
app.get("/movies/:title",  passport.authenticate('jwt', {session: false}), 
(req, res) => {
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
app.get("/movies/genre/:name",  passport.authenticate('jwt', {session: false}), 
(req, res) => {
  Movies.findOne({"Genre.Name": req.params.name}) 
    .then((movies) => {
      res.json(movies.Genre);
    }) 
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
  });

// get  Director info 
// app.get("/movies/:director", (req, res) => {
//   Movies.findOne({Director: req.params.Director }) 
//     .then((director) => {
//       res.json(director);
//     })
//     .catch((err) => {
//       console.error();
//       res.status(500).send("Error: " + err);
//     }) 
//   });
  
// get info on Director when looking for specific Director
app.get("/movies/director/:name/",  passport.authenticate('jwt', {session: false}), 
(req, res) => {
  Movies.findOne({"Director.Name": req.params.name }) 
    .then((movies) => {
      res.json(movies.Director);
    })
    .catch((err) => {
      console.error();
      res.status(500).send("Error: " + err);
    }) 
  });


//  GET-all users
app.get("/users",  passport.authenticate('jwt', {session: false}), 
(req,res) => {
    Users.find().then((users) => {
        res.status(201).json(users);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send("Error: "+ err);
    });
}); 

// --GET one user
app.get("/user/:Username",  passport.authenticate('jwt', {session: false}), 
(req,res) => {
    Users.findOne({Username: req.params.Username })
    .then((user) => {res.json(user);
    })
    .catch((error) => { console.error(error);
        res.status(500).send("Error: "+ error);
    });
});

// --FindOne & Update - allow users to update their user info
app.put("/users/:Username",  passport.authenticate('jwt', {session: false}), 
(req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username},
    {$set:{
        Username: req.body.Username,
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
app.post("/users", 
  [
    check("Username", "Username is required").isLength({min:5}),
    check("Username", "Username contains non alphanumeric characters - not allowed").isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear to be valid").isEmail()
    ],  (req,res) => {
    // check the validation object  for errors 
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(422).json({ errors : errors.array() });
  } 
  let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({Username: req.body.Username}) //search within request if User already exists
    .then((user) =>{
    if (user) {
        return res.status(400).send(req.body.Username+ "already exists");
    }  else {
        Users.create({
            Username: req.body.Username,
            Password: hashedPassword, 
            Email: req.body.Email,
            Birthday: req.body.Birthday
        })
        .then((user) => {res.status(201).json(user) })
        .catch((error) => {
            console.error(error);
            res.status(500).send("Error: "+ error);
            })
        }  
    })
    .catch((error) => {
      console.error(error);
            res.status(500).send("Error: "+ error);
    })
});

// --POST a movie to user Favorite Movies
app.post("/users/:Username/movies/:MovieID",  passport.authenticate('jwt', {session: false}), 
(req,res) => {
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
app.delete("/users/:Username/movies/:MovieID",  passport.authenticate('jwt', {session: false}), 
(req,res) => {
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
app.delete("/users/:Username",  passport.authenticate('jwt', {session: false}), 
(req,res) => {
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
const port = process.env.Port || 8080;
app.listen(port, '0.0.0.0.', () => {  
    console.log("Your app is listening on Port " + Port ) 
  });
  module.exports = app;