const {default:mongoose} = require('mongoose');
let moviesSchema = mongoose.Schema({
    Title: {type: String, require: true},
    Description: {type: String, require:true},
    Genre: {
        Name: String,
    Description: String
    },
    Director: {
        Name: String,
        Bio: String,
        Birthyear: Date,
        Deathyear: Date
    },
    Actor: [String],
    ImagePath: String,
    Feature: Boolean
});
let usersSchema = mongoose.Schema({
    Username: {type:String, required:true},
    Password: {type:String, require:true},
    Email: {type:String, require:true},
    Birthday: Date,
    FavoriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref:'Movie'}]
});
let Movie = mongoose.model('Movie', moviesSchema);
let User = mongoose.model('User', usersSchema);

module.exports.Movie = Movie;
module.exports.User = User;

// module.exports = { 
//     User, 
//     Movie
// };
