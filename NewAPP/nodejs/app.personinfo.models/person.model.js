var mongoose = require("mongoose");

const personInfoSchema = mongoose.Schema({
    //userName: Number,
    personId: Number,
    firstName: String,
    middleName: String,
    lastName: String,
    gender: String,
    dob: String,
    age: Number,        
    flatNumber: String,
    societyName: String,
    areaName: String,
    email:  String,
    city: String,
    state: String,
    pinCode: Number,
    phoneNo: Number,                 
    mobileNo: Number,
    physicalDisability: String,
    maritalStatus: String,
    education: String,
    birthSign:String,                        
    isAuthorized: String,
    status: String,
    userId: Number
  });
  
var perInfo =  mongoose.model("PersonInfo", personInfoSchema, "PersonInfo");
module.exports = perInfo;

var tempPersonInfo =  mongoose.model("TempPersonInfo", personInfoSchema, "TempPersonInfo");
module.exports = tempPersonInfo;