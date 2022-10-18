//importing express & morgan
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
app.use(morgan('common'));
app.use(bodyParser.json());


let topMovies = [{
        title:'The Lord of the Rings: The Fellowship of the Ring',
        data:{
            director:'Peter Jackson',
            genre:'adventure, epic fantasy'   
        }
    },
    {
        title:'The Lord of the Rings: The Two Towers',
        data:{
            director:'Peter Jackson',
            genre:'adventure, epic fantasy'    
        }
        
    },
    {
        title:'The Lord of the Rings: The Return of the King',
        data:{
            director:'Peter Jackson',
            genre:'adventure, epic fantasy'    
        }
    },
    {
        title:'Star Wars: Episode IV- A New Hope',
        data:{
            director:'George Lucas',
            genre:'space opera, science fiction'    
        }
    },
    {
        title:'Star Wars: Episode V- The Empire Strikes Back',
        data:{
            director:'Irvin Keshner',
            genre:'space opera, science fiction'    
        }
    },
    {
        title:'Star Wars: Episode VI- Return of the Jedi',
        data: {
            director:'Richard Marquand',
            genre:'space opera, science fiction'
        }
    },
    {
        title:'Star Wars: Episode I- The Phantom Menace',
        data:{
            director:'George Lucas',
            genre:'space opera, science fiction' 
        }
    },
    {
        title:'Star Wars: Episode II- Attack of The Clones',
        data:{
            director:'George Lucas',
            genre:'space opera, science fiction'    
        }
    },
    {
        title:'Star Wars: Episode III- Revenge of The Sith',
        data:{
            director:'George Lucas',
            genre:'space opera, science fiction'    
        }
    },
    {
        title:'Avengers: Infinity War',
        data:{
            director:'Anthony Russo, Joe Russo',
            genre:'action, science fiction, super heroe movie'    
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
});
// get a top movie by its title
app.get('/movies/:title', (req, res) => {
    res.send('Succesful GET request returning data of movie by title.');
    // res.json(topMovies.find((title) =>
    // { return topMovies.data.title === req.params.title }));
});

// get a top movie by the genre
app.get('/movies/data/:genre', (req, res) => {
    res.send('Succesful GET request returning data of movie by genre.');
    // res.json(topMovies.data.find((director) =>
    // { return topMovies.data.director === req.params.director }));
});

// get a top movie by the director
app.get('/movies/data/:director', (req, res) => {
    res.send('Succesful GET request returning data of movie by director.');
    // res.json(topMovies.data.find((director) =>
    // { return topMovies.data.director === req.params.director }));
});

// get access to data about the movie
app.get('/movies/:data', (req, res) => {
    res.send('Succesful GET request returning data on movie by title.');
    // res.json(topMovies.find((data) => 
    // { return topMovies.data === res.params.data }));
});

app.use(express.static('public'));

// add a new user
app.post('/user', (req, res) => {
    res.send('Succesful POST request creating a user.')
    // let newUser = req.body;
    // if (!newUser.name) {
    // }
});
// update user
app.put('/user/:', (req, res) => {
res.send('Succesful PUT request updating user information.');
});
// deregistration of user (need to ask which method applies)
app.put('/user', (req, res) => {
    res.send('Succesful DELETE/PUT request updating user deregistration.');
});
// delete user 
app.delete('/user/:delete', (req, res) => {
res.send('Succesful DELETE request removing the user.')
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
