var express = require('express');
var mongoose= require('mongoose');
var User= require('../models/user');
var router = express.Router();
var passport= require('passport');

var bcrypt= require('bcrypt');


/* GET users listing. */
router.post('/register', function(req, res, next) {
  addToDB(req, res);
});


async function addToDB(req, res){

  var pass = User.hashPassword(req.body.password);
  var user= new User({
    username: req.body.username,
    password: pass
  });

  try{
    doc= await user.save();
    return res.status(201).json(doc);
  }
catch(err){
  return res.status(501).json(err);
}

}


router.post('/login',function(req,res,next){
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.status(501).json(err); }
    if (!user) { return res.status(501).json(info); }
    req.login(user, function(err) {
      if (err) { return res.status(501).json(err); }
      return res.status(200).json({message:'Login Success'});
    });
  })(req, res, next);
});



module.exports = router;
