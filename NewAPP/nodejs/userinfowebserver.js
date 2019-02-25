var express = require('express');
var instance = express();
module.exports= instance;

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;

var cors = require("cors");
instance.use(cors());

var bodyParser = require("body-parser");
instance.use(bodyParser.urlencoded({ extended: false }));
instance.use(bodyParser.json());

var roles = require("./app.personinfo.dals/roles.dals");
var users = require("./app.personinfo.dals/users.dals");
var auth = require("./app.personinfo.common/authentication");
var personInfo = require("./app.personinfo.dals/personinformation.dal");

var connection= mongoose.connect(
  "mongodb://localhost/PersonInformation",
  { useNewUrlParser: true }
);

module.exports= connection;

var dbConnect = mongoose.connection;
if(!dbConnect) {
  console.log("Connection is established");
  return;
}

//Generate the secrete key for jwtSecret
var jwtSettings = {
    jwtSecret: "qWhdiwywsnW26dwcsQkshd^sdh"
  };

//Set the secrete key with express
instance.set( "jwtSecret" , jwtSettings.jwtSecret );

instance.post("/api/users/auth", function(request, response) {

    auth.authUser(request, response);

});

//Role get Operation
instance.get("/api/role", function( request , response ) {
    
    var tokenReceived = request.headers.authorization.split(" ")[1];
    var receivedToken = auth.verifyUser(tokenReceived);

    if(receivedToken == false){
        response.send({ success: false, message: "Token verification failed" });
    } else{
        roles.getRoles( request , response );
    }

});

//Role Post Operation
instance.post("/api/role", function( request , response ) {
   
    var tokenReceived = request.headers.authorization.split(" ")[1];
    var receivedToken = auth.verifyUser(tokenReceived);

    if(receivedToken == false){
        response.send({ success: false, message: "Token verification failed" });
    } else{
        roles.postRoles( request , response );
    }

});

//Role Update Operation
instance.put("/api/role/:id", function( request , response ) {
    
    var tokenReceived = request.headers.authorization.split(" ")[1];
    var receivedToken = auth.verifyUser(tokenReceived);

    if(receivedToken ==false){
        response.send({ success: false, message: "Token verification failed" });
    } else{
        roles.updateRoles( request , response );
    }

});

//Role delete Operation
instance.delete("/api/role/:id", function( request , response ) {
    
    var tokenReceived = request.headers.authorization.split(" ")[1];
    var receivedToken = auth.verifyUser(tokenReceived);

    if(receivedToken ==false){
        response.send({ success: false, message: "Token verification failed" });
    } else{
        roles.deleteRoles( request , response );
    }
});


//Users get Operation
instance.get("/api/users", function( request , response ) {

    var tokenReceived = request.headers.authorization.split(" ")[1];
    var receivedToken = auth.verifyUser(tokenReceived);

    if(receivedToken ==false){
        response.send({ success: false, message: "Token verification failed" });
    } else{
        users.getUsers(request, response);
    }

});

//Users Post Operation
instance.post("/api/users", function( request , response ) {

    var tokenReceived = request.headers.authorization.split(" ")[1];
    var receivedToken = auth.verifyUser(tokenReceived);

    if(receivedToken ==false){
        response.send({ success: false, message: "Token verification failed" });
    } else{
        users.postUser(request, response);
    }

});

//Users Update Operation
instance.put("/api/users/:id", function( request , response ) {

    var tokenReceived = request.headers.authorization.split(" ")[1];
    var receivedToken = auth.verifyUser(tokenReceived);

    if(receivedToken ==false){
        response.send({ success: false, message: "Token verification failed" });
    } else{
        users.updateUser(request, response);
    }

});

//Users delete Operation
instance.delete("/api/users/remove/:userId", function( request , response ) {
    var tokenReceived = request.headers.authorization.split(" ")[1];
    var receivedToken = auth.verifyUser(tokenReceived);
    
    if(receivedToken ==false){
        response.send({ success: false, message: "Token verification failed" });
    } else{
       users.deleteUser(request,response);
    }
});

//Person Information GET Operation
instance.get("/api/personinfo",function(request, response){
    var isValToken = auth.verifyUser(request.headers.authorization.split(" ")[1])
    if(isValToken==false){
        response.send({success:false, Message:"Token verification failed"});
    }
    else{
        personInfo.getPersonInfo(request, response);
    }
});

instance.get("/api/personinfo/id/:userId",function(request, response){
    
    var isValToken = auth.verifyUser(request.headers.authorization.split(" ")[1])
    if(isValToken==false){
        response.send({success:false, Message:"Token verification failed"});
    }
    else{
        personInfo.getPersonInfoById(request, response);
    }
});

//Person Information POST Operation
instance.post("/api/personinfo",function(request, response){
    //console.log("Post request..");
    var isValToken = auth.verifyUser(request.headers.authorization.split(" ")[1])
    if(isValToken==false){
        response.send({success:false, Message:"Token verification failed"});
    }
    else{
        personInfo.postPersonalInfo(request, response)
    }
});

//Person Information PUT Operation
instance.put("/api/personinfo",function(request, response){
    var isValToken = auth.verifyUser(request.headers.authorization.split(" ")[1])
    if(isValToken==false){
        response.send({success:false, Message:"Token verification failed"});
    }
    else{
        personInfo.putPersonInfo(request, response)
    }
});

//Person Information DELETE Operation
instance.get("/api/personinfoapprove/:personid",function(request, response){
    var isValToken = auth.verifyUser(request.headers.authorization.split(" ")[1])
    if(isValToken==false){
        response.send({success:false, Message:"Token verification failed"});
    }
    else{
        personInfo.approvePersonInfo(request, response)
    }
});

instance.get("/api/personinfo/byuserid/:userId", function(request, response){
    var isValToken = auth.verifyUser(request.headers.authorization.split(" ")[1])
      if(isValToken==false){
        response.send({status:500, error:"Token verification failed"})
      }
      else{
        personInfo.getPersonInfoByUserId(request, response)
    
      }
  });

instance.get("/api/personinfo/:status",function(request, response){
    var isValToken = auth.verifyUser(request.headers.authorization.split(" ")[1])
    if(isValToken==false){
        response.send({success:false, message:"Token verification failed"});
    }
    else{
        personInfo.getPersonInfoByStatus(request, response)
    }
});

instance.get("/api/temppersoninfo/approve/:userId",function(request, response){
    var isValToken = auth.verifyUser(request.headers.authorization.split(" ")[1])
    if(isValToken==false){
        response.send({success:false, message:"Token verification failed"});
    }
    else{
        personInfo.doApprovePerson(request, response)
    }
});

instance.delete("/api/temppersoninfo/reject/:userId",function(request, response){
    var isValToken = auth.verifyUser(request.headers.authorization.split(" ")[1])
    if(isValToken==false){
        response.send({success:false, message:"Token verification failed"});
    }
    else{
        personInfo.doRejectPerson(request, response)
    }
});

instance.get("/api/searchuser/:userName",function(request, response){
    var isValToken = auth.verifyUser(request.headers.authorization.split(" ")[1])
    if(isValToken == false){
        response.send({success:false, message:"Token verification failed"});
    }
    else{
        personInfo.searchByUserName(request, response)
    }
});

// to create server
instance.listen(4040, function() {
  console.log("Started listening on port 4040");
});