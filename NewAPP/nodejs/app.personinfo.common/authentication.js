var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var datetime = require("node-datetime");

var usermod = require("./../app.personinfo.models/users.model");
var instance = require("./../userinfowebserver");

var rolmod = require("./../app.personinfo.models/roles.model");
var RoleModel = mongoose.model("Roles");

var loginstatusmod = require("./../app.personinfo.models/loginstatus.model");
var loginStatusModel = mongoose.model("LoginStatus");

const iplocation = require("iplocation").default;
var userModel = mongoose.model("Users");



module.exports = {
  authUser: function(request, response) {
    var user = {
      userName: request.body.userName,
      password: request.body.password
    };

    userModel.findOne({ userName: request.body.userName }, function(err, usr) {
      if (err) {
        response.send({ status: 500, error: err });
      }
        if (!usr) {
          response.send({ status: 400, message: "Sorry, User not found...!" });
        } else if (usr) {
          if (usr.password !== user.password) {
              response.send({
              status: 404,
              message: "Sorry, UserName and Password does not match..!"
          });
        } else {
          var token = jwt.sign({ usr }, instance.get("jwtSecret"), {
            expiresIn: 3600
          });
          tokenStore = token;
    
          RoleModel.find({roleId: usr.roleId}, function(error, role){
           
            if(role){
                var rolename = role[0].roleName;
                var userId = usr.userId;
                var userName = user.userName;
                
                response.send({
                  status:200,
                  authenticated: true,
                  message: "Login Success",
                  token: tokenStore,
                  userId: userId,
                  userName: userName,
                  roleName: rolename
                });
            }
        });

          //Ip details with datetime
          //   iplocation("103.76.9.30", [], (error, res) => {
          //     console.log(res);
          //       var address =  res.city+" "+ res.region +" "+ res.country +"-"+ res.postal;
          //       var dt = datetime.create();
          //       var currDateTime = dt.format('m/d/Y H:M:S');

          //       var loginStatus = {
          //           userName:request.body.userName,
          //           loginFrom:address,
          //           dateTime:currDateTime,
          //           ipAddress:request.body.ip
          //       }

          //       console.log(JSON.stringify(loginStatus));
          //       // to save details in LoginStatus
          //       loginStatusModel.create(loginStatus);
        }
      }
    });
  },

  verifyUser: function(tokenReceived) {
    var returnToken;

    jwt.verify(tokenReceived, instance.get("jwtSecret"), function(
      err,
      decoded
    ) {
      if (err) {
        returnToken = false;
      } else {
        returnToken = true;
      }
    });

    return returnToken;
  }
};
