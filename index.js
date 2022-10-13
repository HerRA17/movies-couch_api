const express = require('express');
const morgan = require('morgan');

const app = express();

const bodyParser = require('body-parser');
const methodOverride = require('method-override');

app.use(morgan('common'));

let topMovies = [{
        title:'The Lord of the Rings: The Fellowship of the Ring',
        director:'Peter Jackson',
        genre:'adventure, epic fantasy'
    },
    {
        title:'The Lord of the Rings: The Two Towers',
        director:'Peter Jackson',
        genre:'adventure, epic fantasy'
    },
    {
        title:'The Lord of the Rings: The Return of the King',
        director:'Peter Jackson',
        genre:'adventure, epic fantasy'
    },
    {
        title:'Star Wars: Episode IV- A New Hope',
        director:'George Lucas',
        genre:'space opera, science fiction'
    },
    {
        title:'Star Wars: Episode V- The Empire Strikes Back',
        director:'Irvin Keshner',
        genre:'space opera, science fiction'
    },
    {
        title:'Star Wars: Episode VI- Return of the Jedi',
        director:'Richard Marquand',
        genre:'space opera, science fiction'
    },
    {
        title:'Star Wars: Episode I- The Phantom Menace',
        director:'George Lucas',
        genre:'space opera, science fiction'
    },
    {
        title:'Star Wars: Episode II- Attack of The Clones',
        director:'George Lucas',
        genre:'space opera, science fiction'
    },
    {
        title:'Star Wars: Episode III- Revenge of The Sith',
        director:'George Lucas',
        genre:'space opera, science fiction'
    },
    {
        title:'Avengers: Infinity War',
        director:'Anthony Russo, Joe Russo',
        genre:'action, science fiction, super heroe movie'}
];
//get request
app.get('/', (req, res) => {
    res.send('Welcome to Movies-couch!');
});

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', {root:__dirname});
});

app.get('/movies', (req, res) => {
    res.json(topMovies);
});
//app.use(express.static('public));
//error handling
app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(bodyParser.json());
app.use(methodOverride());

app.use((err, req, res, next) =>{
console.error(err.stack);
res.status(500).send('Something broke!')
});
//listen for request
app.listen(8080, () => {
    console.log('Your app is listening to port 8080.')
});
