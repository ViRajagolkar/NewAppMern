var mongoose = require("mongoose");

var rolesSchema = mongoose.Schema({
    roleId: Number,
    roleName: String
  });
  
module.exports = mongoose.model("Roles", rolesSchema, "Roles");