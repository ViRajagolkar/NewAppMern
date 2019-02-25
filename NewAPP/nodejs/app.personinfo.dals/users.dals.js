var mongoose = require("mongoose");

var usermod = require("../app.personinfo.models/users.model");
var rolemod=require("./../app.personinfo.models/roles.model");

var RoleModel = mongoose.model("Roles");
var UserModel = mongoose.model("Users");

module.exports ={
   // Get Users function returns all users
    getUsers: function(request,response){

        UserModel.find().exec(function(err, res) {
            if (err) {
                response.statuscode = 404;
                response.send({ status: response.statuscode, error: err });
              }

              response.statuscode = 200;
              response.send({ status: response.statuscode, data: res });
        })
    },

    postUser: function(request, response){
        // find Max UserId to autoincrement
        UserModel.find().sort({userId: -1}).limit(1).exec(function(err, res) {
            var maxuserid= res[0].userId;
            if (err) {
                response.statuscode = 404;
                response.send({ status: response.statuscode, error: err });
              }
              var userId= maxuserid + 1;

              // find RoleId using RoleName
              RoleModel.find({roleName: request.body.roleName}).exec(function(err, res) {
                var roleId= res[0].roleId;
                if (err) {
                  response.statuscode = 404;
                  response.send({ status: response.statuscode, error: "" });
                }

                let user={
                    userId: userId,
                    userName: request.body.userName,
                    emailAddress: request.body.emailAddress,
                    password: request.body.password,
                    roleId: roleId
                }

                //post operation
                UserModel.findOne({userName: request.body.userName},function(err, respUser){
                    if(respUser != null){
                        response.statuscode = 200;
                        response.send({ status: response.statuscode, message: "User already exist..!" });
                    } else{
                         UserModel.create(user, function(err, res){
                            if (err) {
                                response.statuscode = 404;
                                response.send({ status: response.statuscode, error: err });
                            }
                            response.statuscode = 200;
                            response.send({ status: response.statuscode, data: respUser , message: "User Information added successfully...!"});
                        });
                    }
            });
            });
        });
    },


    updateUser: function(request, response){
        
        let user={
            userId: request.body.userId,
            userName: request.body.userName,
            emailAddress: request.body.emailAddress,
            password: request.body.password,
            roleId: request.body.roleId
        }
        let condition= {
            userId: request.params.id
        }

        UserModel.updateOne(condition, user, function(err, res){
            if (err) {
                response.statuscode = 404;
                response.send({ status: response.statuscode, error: err });
              }
            
              response.statuscode = 200;
              response.send({ status: response.statuscode, data: res, message: "User Information updated successfully...!" });
        });
    },


    deleteUser: function(request, response){
       
        let condition= {
            userId: request.params.userId
        }

        UserModel.deleteOne(condition, function(err, res){
            if (err) {
                response.statuscode = 404;
                response.send({ status: response.statuscode, error: err });
              }
             
              response.statuscode = 200;
              response.send({ status: response.statuscode, data: res, message: "User Information deleted...!" });
        });
    },

    searchByUserName: function(request, response){

        UserModel.find({userName: request.params.userName}).exec(function(err, res) {
            if (err) {
                response.statuscode = 404;
                response.send({ status: response.statuscode, error: err });
              }
              response.statuscode = 200;
              response.send({ status: response.statuscode, data: res });
        })
    }

}