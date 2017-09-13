var mongoose               = require("mongoose"),
    passportLocalMongoose  = require("passport-local-mongoose");
    
var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: Number,
    opt: Number,
    mentees: Number
});

userSchema.plugin(passportLocalMongoose,{usernameField: 'username'});

module.exports = mongoose.model("User", userSchema);