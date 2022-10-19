//importing express & morgan
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
app.use(morgan('common'));
app.use(bodyParser.json());
let users = [
    {
        id: 1,
        name: 'Gustavo Fring',
        favoriteMovies:'The Lord of the Rings: The Return of the King'
    },

];

let topMovies = [{
        'Title':'The Lord of the Rings: The Fellowship of the Ring',
        'Data':{
            'Director':'Peter Jackson',
            'genre':'adventure, epic fantasy'   
        }
    },
    {
        'Title':'The Lord of the Rings: The Two Towers',
        'Data':{
            'Director':'Peter Jackson',
            'Genre':'adventure, epic fantasy'    
        }
        
    },
    {
        'Title':'The Lord of the Rings: The Return of the King',
        'Data':{
            'Director':'Peter Jackson',
            'Genre':'adventure, epic fantasy'    
        }
    },
    {
        'Title':'Star Wars: Episode IV- A New Hope',
        'Data':{
            'Director':'George Lucas',
            'Genre':'space opera, science fiction'    
        }
    },
    {
        'Title':'Star Wars: Episode V- The Empire Strikes Back',
        'data':{
            'Director':'Irvin Keshner',
            'Genre':'space opera, science fiction'    
        }
    },
    {
        'Title':'Star Wars: Episode VI- Return of the Jedi',
        'data':{
            'Director':'Irvin Keshner',
            'Genre':'space opera, science fiction'    
        }
    },
    {
        'Title':'Star Wars: Episode I- The Phantom Menace',
        'data':{
            'Director':'George Lucas',
            'Genre':'space opera, science fiction'    
        }
    },
    {
        'Title':'Star Wars: Episode II- Attack of The Clones',
        'data':{
            'Director':'George Lucas',
            'Genre':'space opera, science fiction'    
        }
    },
    {
        'Title':'Star Wars: Episode III- Revenge of The Sith',
        'data':{
            'Director':'George Lucas',
            'Genre':'space opera, science fiction'    
        }
    },
    {
        'Title':'Avengers: Infinity War',
        'Data':{
            'Director':'Anthony Russo, Joe Russo',
            'Genre':'action, science fiction, super heroe movie'    
        }
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
    res.json(topMovies);
    //res.status(200).json(movies);
});

// get a top movie by its title
app.get('/movies/:title', (req, res) => {
    // res.send('Succesful GET request returning data of movie by title.');
    const { title } = req.params;
    const movies = movies.find(movie => movie.Title === title);
     if (movies) {
        res.status(200).json(movies);
    } else {
        res.status(404).send('Not such movie')
    }
      
    res.json(topMovies.find((title) =>
    { return topMovies.data.title === req.params.title })); 
});

// get a top movie by the genre
app.get('/movies/:data/:genre', (req, res) => {
    // res.send('Succesful GET request returning data of movie by genre.');
    const { genre } = req.params;
     genre = movies.find(movie => movie.Genre === genre);
    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(404).send('Not such genre')
    }
    res.json(topMovies.data.find((director) =>
     { return topMovies.data.director === req.params.director })); 
});

// get a top movie by the director
app.get('/movies/data/:director', (req, res) => {
    // res.send('Succesful GET request returning data of movie by director.');
    const { director } = req.params;
     director = movies.find(movie => movie.director === director);
    if (genre) {
        res.status(200).json(director);
    } else {
        res.status(404).send('Not found the Director name')
    } 
    res.json(topMovies.data.find((director) =>
     { return topMovies.data.director === req.params.director })); 
});

// get access to data about the movie
app.get('/movies/:data', (req, res) => {
    // res.send('Succesful GET request returning data on movie by title.');
    res.json(topMovies.find((data) => 
    { return topMovies.data === res.params.data }));
});

app.use(express.static('public'));

// add a new user
app.post('/users', (req, res) => {
    // res.send('Succesful POST request creating a user.')
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
// res.send('Succesful PUT request updating user information.');
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
    // res.send('Succesful POST request creating a user.')
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
    // res.send('Succesful POST request creating a user.')
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
app.put('/user', (req, res) => {
    res.send('Succesful deregistered of email from list.');
    
});

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
app.use(bodyParser.urlencoded({
    extended:true
}));


app.use((err, req, res, next) =>{
console.error(err.stack);
res.status(500).send('Something broke!')
});
//listen for request
app.listen(8080, () => {
    console.log('Your app is listening to port 8080.')
});
