//importing express & morgan
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended:true
}));

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
app.get('/movies/:genre/', (req, res) => {
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
app.get('/movies/:director/director/', (req, res) => {
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
    const { id } = req.params;
    const updatedUser = req.body;
     let user = users.find(user => user.id == id); 
    if (user) {
     user.name = updatedUser.name;
     res.status(200).json(user);
    } else {
    res.status(400).send('no such user')    
    }
});

// update user
app.put('/user/:id', (req, res) => {
    const newUser = req.body;
     if (newUser.name) {
     newUser.id = uuid.v4;
     users.push(newUser);
     res.status(201).json(newUser);
    } else {
    res.status(400).send('users needs names!') 
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

// deregistration of user (need to ask which method applies)
// app.put('/user', (req, res) => {
//     res.send('Succesful deregistered of email from list.');
    
// });

// delete user 
app.delete('/user/:id', (req, res) => {
// res.send('Succesful DELETE request removing the user.')
    const { id } = req.params;
     let user = users.find(user => user.id == id); 
    if (user) {
     users = users.filter(user => user.id != user.id);
     res.status(200).send(`user ${id} has been deleted`);
    } else {
    res.status(400).send('no such user')    
    }
});

//error handling
app.use((err, req, res, next) =>{
console.error(err.stack);
res.status(500).send('Something broke!')
});
//listen for request
app.listen(8080, () => {
    console.log('Your app is listening to port 8080.')
});
