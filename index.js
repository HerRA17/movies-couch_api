//importing express & morgan
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
uuid = require('uuid');
const app = express();
//const mongoose = require('mongoose');
// const Models = require('./models.js');
// const Movies = Models.Movie;
// const Users = Models.user;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(morgan('common'));
app.use(express.static('public'));

// mongoose.connect('mongodb://localhost:27017/dbmovies' , {useNewUrlparser: true, useUnifiedTopology: true});

let users = [
    {
        id: 1,
        name: 'Gustavo Fring',
        favoriteMovies:'The Lord of the Rings: The Return of the King'
    },

];

let movies = [{
        'Title':'The Lord of the Rings: The Fellowship of the Ring',
        'Director':'Peter Jackson',
        'Genre':[
            'adventure',
            'epic fantasy'
        ]    
    },
    {
        'Title':'The Lord of the Rings: The Two Towers',
        'Director':'Peter Jackson',
        'Genre':[
                'adventure',
                'epic fantasy'
            ]    
    },
    {
        'Title':'The Lord of the Rings: The Return of the King',
        'Director':'Peter Jackson',
        'Genre': [
                'adventure',
                'epic fantasy'
            ]    
    },
    {
        'Title':'Star Wars: Episode IV- A New Hope',
        'Director':'George Lucas',
        'Genre':[
                'space opera', 
                'science fiction'    
            ]
    },
    {
        'Title':'Star Wars: Episode V- The Empire Strikes Back',
        'Director':'Irvin Keshner',
        'Genre':[
                'space opera', 
                'science fiction'    
            ]
    },
    {
        'Title':'Star Wars: Episode VI- Return of the Jedi',
        'Director':'Irvin Keshner',
        'Genre':[
            'space opera', 
            'science fiction'    
        ]
    },
    {
        'Title':'Star Wars: Episode I- The Phantom Menace',
        'Director':'George Lucas',
        'Genre':[
                'space opera', 
                'science fiction'    
            ]    
    },
    {
        'Title':'Star Wars: Episode II- Attack of The Clones',
        'Director':'George Lucas',
        'Genre':[
                'space opera', 
                'science fiction'    
            ]
    },
    {
        'Title':'Star Wars: Episode III- Revenge of The Sith',
        'Director':'George Lucas',
        'Genre':[
            'space opera', 
            'science fiction'    
        ]
    },
    {
        'Title':'Avengers: Infinity War',
        'Director':'Anthony Russo, Joe Russo',
        'Genre':[
            'action',
            'science fiction',
            'super heroe movie'
        ]    
        
    }];

// get requests
app.get('/', (req, res) => {
    res.send('Welcome to Movies-couch!');
});

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', {root:__dirname});
});

// get top Movies
app.get('/movies', (req, res) => {
    res.json(movies);
    //res.status(200).json(movies);
});

// get a top movie by its title
app.get('/movies/:title', (req, res) => {
    const title  = req.params.title;
    if (!title) {
        res.status(404).send('You must provide a title');
    }
    const movie = movies.find(movie => movie.Title === title);
     if (!movie) {
        res.status(404).send('Movie not found');    
    } else {
        res.status(200).json(movie);
    }
      
    res.json(movies.find((title) =>
    { return movies.data.title === req.params.title })); 
});

// get a top movie by the genre
app.get('/movies/genre/:genre', (req, res) => {
    const genre = req.params.genre;
    if (!genre) {
        res.status(404).send('You must provide a genre');
    }
    if (genre) {
        const movie = movies.filter((movie) => {
        return  (movies.genre.find((genre) => genre === genre))
        });
            
    if (!movie) {
        res.status(404).send('Movie not found')
    }
     res.status(200).json(movie);
    }
});

// get a top movie by the director
app.get('/movies/director/:director/', (req, res) => {
    const director  = req.params.director;
    if (!director) {
        res.status(400).send('You must provide a director');
    }
    const movie = movies.filter((movie) => movie.Director === director); 
    if (movie) {
        res.status(404).send('Movie not found');
    }
    res.status(200).json(director);
});

// get users
app.get('/users', (req, res) => {
    res.json(users);
});
// add a new user
app.post('/users', (req, res) => {
    const newUser = req.params;
    if (newUser.name) {
     newUser.id = uuid.v4();
     users.push(newUser);
     res.status(200).json(newUser);
    } else {
    res.status(400).send('no such user')    
    }
});

// update user
app.put('/users/:id', (req, res) => {
    const {id} = req.params;
    const updatedUser = req.body;
    let user = user.find( user => user.id === id);
     if (user) {
     user.name = updatedUser.name; 
     res.status(200).json(newUser);
    } else {
    res.status(400).send('No such users!') 
    }
});

//adding to users favorite movies
app.post('/users/:id/:title', (req, res) => {
    const { id, title } = req.params;
    let user = users.find(user => user.id == id); 
    if (user) {
     user.favoriteMovies.push(title);
     res.status(200).send(`${title} has been added to user ${id}'s array`);
    } else {
    res.status(400).send('no such user')    
    }
    
   });

//deleting a movie from Favorite list
app.delete('/users/:id/:title', (req, res) => {
    const { id, title } = req.params;
     let user = users.find(user => user.id == id); 
    if (user) {
     user.favoriteMovies = user.favoriteMovies.filter(title => title !== title);
     res.status(200).send(`${title} has been removed from user ${id}'s array`);
    } else {
    res.status(400).send('no such user')    
    }
    
   });

   // delete user 
app.delete('/user/:id', (req, res) => {
        const { id } = req.params;
         let user = users.find(user => user.id == id); 
        if (user) {
         users = users.filter(user => user.id != user.id);
         res.status(200).send(`user ${id} has been deleted`);
        } else {
        res.status(400).send('no such user')    
        }
    });

/* --Mongoose GET-all users
app.get('/users', (req,res) => {
    Users.find().then((users) => {
        res.status(201).json(users);
    })
    .catch((error) => {
        console.error(err);
        res.status(500).send('Error: '+ err);
    });
}); 

--GET one user
app.get('/user/:Username', (req,res) => {
    Users.findOne({Username: req.params.Username })
    .then((user) => {res.json(user);
    })
    .catch((err) => { console.error(error);
        res.status(500).send('Error: '+ error);
    });
});

--FindOne & Update 
app.put('/users/:Username', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username},
    {$set:{
        Usernam: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
    }
    },
    { new:true },
    (err, updatedUser) => {
        if(err) {
            console.error(err);
            res.status(500).send('Error: '+ err);
        } else {
            res.json(updatedUser);
        }
    });
}); 
*/

   /* --Monggose-- POST
app.post('/users', (req,res) => {
    Users.findOne({Username: req.body.Username}).then((user) =>{
    if (user) {
        return res.status(400).send(req.body.Username+ 'already exists');
    }  else {
        Users.create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
        })
        .then((user) => {res.status(201).json(user) })
        .catch((error) => {
            comnsole.error(error);
            res.status(500).send('Error: '+ error);
            })
        }  
    })
    .catch((error))
});

--POST a movie to user Favorite Movies
app.post('/users/:Username/movies/:MovieID', (req,res) => {
    Users.findOneAndUpdate({ usernam: req.params.Username}, {$push:{ FavoriteMovies: req.params.MovieID} 
    },
    {new:true},
    (err, updatedUser) => {
        if(err) {
            console.error(err);
            res.status(500).send('Error: '+ err);
        } else {
            res.json(updatedUser)
        }
    });
});

--DELETE remove a movie from Favorite Movies
app.delete('/users/:Username/movies/:MovieID', (req,res) => {
    Users.findOneAndUpdate({ usernam: req.params.Username}, {$pull:{ FavoriteMovies: req.params.MovieID} 
    },
    {new:true},
    (err, updatedUser) => {
        if(err) {
            console.error(err);
            res.status(500).send('Error: '+ err);
        } else {
            res.json(updatedUser)
        }
    });
});
*/



//error handling
app.use((err, req, res, next) =>{
console.error(err.stack);
res.status(500).send('Something broke!')
});
//listen for request
app.listen(8080, () => {
    console.log('Your app is listening to port 8080.')
});
