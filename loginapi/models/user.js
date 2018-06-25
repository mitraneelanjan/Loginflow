var mongoose= require('mongoose');
var Schema= mongoose.Schema;
var bcrypt= require('bcrypt');

var schema= new Schema({
    id: {type: String},
    username: {type:String, require:true},
    password: {type:String }
});

schema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);
}

schema.method.isValid = function(hashedPassword){
    return bcrypt.compareSync(hashedPassword, this.password);
}

const Something= module.exports = mongoose.model('User',schema);