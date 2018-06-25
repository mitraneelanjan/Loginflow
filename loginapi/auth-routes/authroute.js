var express = require('express');
var mongoose= require('mongoose');
var User= require('../models/user');
var router = express.Router();
var passport= require('passport');

router.get('/login', (req,res)=>{
   res.json({}); 
});

router.get('/google', passport.authenticate('google', { scope: [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read'] 
})

);

router.get('/google/redirect', 
    passport.authenticate('google'), (req,res)=>{
        res.send(req.user);
});



module.exports= router;