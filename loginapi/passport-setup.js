var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var User= require('./models/user');

passport.use(new GoogleStrategy({
    clientID: 'xxxxxxxxx',
    clientSecret: 'xyxyyyyyyx',
    callbackURL: '/auth/google/redirect'
  },
  function(token, tokenSecret, profile, done) {
      console.log(profile);
      User.findOne({id:profile.id}).then((currentUser)=>{
          if(currentUser){
              console.log(currentUser);
              done(null, profile);
          }
          else{
            new User({
                id: profile.id,
                username: profile.displayName
            }).save().then((newUser)=>{
                console.log('user is'+newUser);
                done(null, profile);
            });
          }
      });
      
  }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });