var mongoose = require("mongoose");

var userSchema=mongoose.Schema({
    userId: Number,
    userName: String,
    emailAddress: String,
    password: String,
    roleId: Number
});

module.exports=mongoose.model("Users",userSchema,"Users");