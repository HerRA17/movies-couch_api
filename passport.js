const { models } = require('mongoose');
const passport = require('passport');
LocalStrategy = require('passport-local').Strategy, 
Models = require('./models.js'),
passportJWT = require('passportJWT');

let Users = Modals.User, 
JWTStrategy = passportJWT.Strategy,
ExtractJWT = passportJWT.ExtractJWT;

passport.use(new LocalStrategy({
    usernameField: 'Username',
    passwordField: 'Password'
}, (username, password, callback) => {
    console.log(username + ' '+ password);
    Users.findOne({Username: username}, (error, user) => {
        if (error) {
            console.log(error);
            return callback(error);
        }
        if (!user) {
            console.log('incorrect username');
            return callback(null, false, {message: 'Incorrect username or password.'});
        }
    console.log('finished');
    return callback (null, user);
    });
}));
passport.use(new JWTStrategy({
    jwtFromreqest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretKey: 'your_jwt_secret'
}, (jwtPayload, callback) => {
    return Users.findById(jwtPayload._id)
    .then((user) => {
        return callback (null, user);
    })
    .catch((error) => {
        return callback(error)
    });
}));