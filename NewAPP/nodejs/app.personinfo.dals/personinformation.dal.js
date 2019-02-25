var mongoose = require("mongoose");
    //autoIncrement = require("mongoose-auto-increment");
var personmod = require("./../app.personinfo.models/person.model");
var personInfoModel = mongoose.model("PersonInfo");
var tempPersonInfoModel = mongoose.model("TempPersonInfo");

module.exports={

    getPersonInfo:function(request, response){ 
        personInfoModel.find().exec(function(err,res){
            if(err){
                response.status = 500;
                response.send({status:response.status, error:err});
            }
            response.send({status:200, data:res});
        });
    },

    getPersonInfoById:function(request, response){ 

        personInfoModel.find({userId: request.params.userId}).exec(function(err,res){
            //console.log("Inside "+JSON.stringify(res));
            if(err){
                response.status = 500;
                response.send({status:response.status, error:err});
            }
            response.send({status:200, data:res});
        });
    },

    postPersonalInfo:function(request, response){
        var roleName = request.body.roleName;   //get userrole admin/operator/accessuser
        let condition={
            userId : request.body.userId,
            firstName : request.body.firstName,
            personId : request.body.personId
        }

        if(roleName=="Admin"){
            personInfoModel.findOne(condition, function(err, res){
                    if(res != null){
                        response.statuscode = 200;
                        response.send({ status: response.statuscode, message: "User already exist..!" });
                    } else{
                        // personInfoModel.plugin(autoIncrement.plugin, {model: 'personInfo', field: 'personId'});
                        personInfoModel.find().sort({personId: -1}).limit(1).exec(function(err, res){
                            var maxpersonId = res[0].personId;
                            if (err) {
                                response.statuscode = 404;
                                response.send({ status: response.statuscode, error: err });
                              }
                              var newPersonId= maxpersonId + 1;

                                        var personInfo = {
                                            personId:newPersonId,
                                            firstName: request.body.firstName,
                                            middleName: request.body.middleName,
                                            lastName: request.body.lastName,
                                            gender: request.body.gender,
                                            dob: request.body.dob,
                                            age:  request.body.age,
                                            flatNumber: request.body.flatNumber,
                                            societyName: request.body.societyName,
                                            areaName: request.body.areaName,
                                            email: request.body.email,
                                            city: request.body.city,
                                            state: request.body.state,
                                            pinCode: request.body.pinCode,
                                            phoneNo: request.body.phoneNo,                 
                                            mobileNo:request.body.mobileNo,
                                            physicalDisability:request.body.physicalDisability, maritalStatus:request.body.maritalStatus,
                                            education: request.body.education,
                                            birthSign:request.body.birthSign,                       
                                            isAuthorized: request.body.isAuthorized,
                                            userId:request.body.userId,
                                            status: "approved"
                                        }
                            
                            personInfoModel.create(personInfo, function(err,res){
                                if(err){
                                    response.status = 500;
                                    response.send({status:response.status, error:err});
                                }
                                response.send({status:200, message:"Person Information Added Successfully"});
                        });
                    })
                    }
                });        
        }
        else{
            personInfoModel.find().sort({personId: -1}).limit(1).exec(function(err, res){
                var maxpersonId = res[0].personId;
                if (err) {
                    response.statuscode = 404;
                    response.send({ status: response.statuscode, error: err });
                  }
                  var newPersonId= maxpersonId + 1;

            var personInfo = {
                personId:newPersonId,
                firstName: request.body.firstName,
                middleName: request.body.middleName,
                lastName: request.body.lastName,
                gender: request.body.gender,
                dob: request.body.dob,
                age:  request.body.age,
                flatNumber: request.body.flatNumber,
                societyName: request.body.societyName,
                areaName: request.body.areaName,
                email: request.body.email,
                city: request.body.city,
                state: request.body.state,
                pinCode: request.body.pinCode,
                phoneNo: request.body.phoneNo,                 
                mobileNo:request.body.mobileNo,
                physicalDisability:request.body.physicalDisability,                 
                maritalStatus:request.body.maritalStatus,
                education: request.body.education,
                birthSign:request.body.birthSign,                       
                isAuthorized: request.body.isAuthorized,
                userId:request.body.userId,
                status: "pending"
            }

            tempPersonInfoModel.findOne(condition, function(err, res){
                if(res != null){
                    response.statuscode = 200;
                    response.send({ status: response.statuscode, message: "User already exist..!" });
                } else {
                    personInfoModel.findOne(condition, function(err, res){
                        if(res != null){
                            response.statuscode = 200;
                            response.send({ status: response.statuscode, message: "User already exist..!" });
                        } else{
                    tempPersonInfoModel.create(personInfo, function(err,res){
                            if(err){
                                response.status = 500;
                                response.send({status:response.status, error:err});
                            }
                            response.send({status:200, message:"Person Information Added Successfully. Approve will soon."});
                        });
                        }
                    });
                    }
                });
            })
            }
    },


    putPersonInfo:function(request, response){
        //let userName = request.body.userName;

        var personInfo = {
            personId:request.body.personId,
            firstName: request.body.firstName,
            middleName: request.body.middleName,
            lastName: request.body.lastName,
            gender: request.body.gender,
            dob: request.body.dob,
            age:  request.body.age,
            flatNumber: request.body.flatNumber,
            societyName: request.body.societyName,
            areaName: request.body.areaName,
            email: request.body.email,
            city: request.body.city,
            state: request.body.state,
            pinCode: request.body.pinCode,
            phoneNo: request.body.phoneNo,                 
            mobileNo:request.body.mobileNo,
            physicalDisability:request.body.physicalDisability,                 
            maritalStatus:request.body.maritalStatus,
            education: request.body.education,
            birthSign:request.body.birthSign,  
            userId:request.body.userId,                     
            isAuthorized: request.body.isAuthorized
        }

        tempPersonInfoModel.create(personInfo, function(err,res){
            if(err){
                response.status = 500;
                response.send({status:response.status, error:err});
            }
            response.send({status:200, Message:"Person Information Updated Successfully. Approve will soon."});
        });
    },

    getPersonInfoByUserId: function(request, response){  
        let userId ={
            userId: request.params.userId   
        }

        personInfoModel.findOne(userId).exec(function(err, res){
            if(err){
                response.status = 500;
                response.send({status:response.status, error:err});
            }
            response.send({status:200, data:res});
        });
    },

    getPersonInfoByStatus: function(request, response){
        var reqStatus = request.params.status;
        var persInfo=[];

        if(reqStatus==="approved"){
            personInfoModel.find().exec(function(err,res){
                if(err){
                    response.status = 500;
                    response.send({status:response.status, error:err});
                }
                else{
                    
                    for(var i=0; i<res.length; i++){
                        persInfo[i] = {
                            userId:res[i].userId,
                            fullName:res[i].firstName+" "+res[i].middleName+" "+res[i].lastName,
                            dob:res[i].dob,
                            mobile:res[i].mobileNo,
                            email:res[i].email,
                            city:res[i].city,
                            status:res[i].status
                        }
                    }
                    response.send({status:200, data:persInfo});
                } 
            });
            } 
        else{
            var condition = {status:reqStatus}
            tempPersonInfoModel.find(condition).exec(function(err,res){
                if(err){
                    response.status = 500;
                    response.send({status:response.status, error:err});
                }
                else{
                    
                    for(var i=0; i<res.length; i++){
                        persInfo[i] = {
                            userId:res[i].userId,
                            fullName:res[i].firstName+" "+res[i].middleName+" "+res[i].lastName,
                            dob:res[i].dob,
                            mobile:res[i].mobileNo,
                            email:res[i].email,
                            city:res[i].city,
                            status:res[i].status
                        }
                    }
                    response.send({status:200, data:persInfo});
                }
            });
        }

    },

    doApprovePerson: function(request, response){
        userId={
            userId:request.params.userId
        }

        tempPersonInfoModel.find(userId).exec(function(err,res){
            
            if(res.length > 0) {
            var personInfo = {
                personId:res[0].personId,
                firstName: res[0].firstName,
                middleName: res[0].middleName,
                lastName: res[0].lastName,
                gender: res[0].gender,
                dob: res[0].dob,
                age:  res[0].age,
                flatNumber: res[0].flatNumber,
                societyName: res[0].societyName,
                areaName: res[0].areaName,
                email: res[0].email,
                city: res[0].city,
                state: res[0].state,
                pinCode: res[0].pinCode,
                phoneNo: res[0].phoneNo,                 
                mobileNo: res[0].mobileNo,
                physicalDisability: res[0].physicalDisability,                 
                maritalStatus: res[0].maritalStatus,
                education: res[0].education,
                birthSign: res[0].birthSign,  
                userId: res[0].userId,                     
                isAuthorized: res[0].isAuthorized,
                status:"approved"
            }

            if(err){
                response.status = 500;
                response.send({status:response.status, error:err});
            }

            //console.log(JSON.stringify(personInfo));

            personInfoModel.create(personInfo, function(err,res){
                if(err){
                    response.status = 500;
                    response.send({status:response.status, error:err});
                }
            });
        
            tempPersonInfoModel.deleteOne(userId, function(err,res){
                if(err){
                    response.status = 500;
                    response.send({status:response.status, error:err});
                }
            });
            response.send({status: 200, message:"Person Information has been approved..!"});
            }
        });
    },

    doRejectPerson: function(request, response){
        userId={
            userId:request.params.userId
        }

        tempPersonInfoModel.deleteOne(userId, function(err,res){
            if(err){
                response.status = 500;
                response.send({status:response.status, error:err});
            }
            response.send({status: 200, data: res, message:"Person Information has been rejected..!"})
        });
    },

    searchByUserName: function(request, response){
        firstName={
            firstName : request.params.userName 
        }

        console.log(firstName);

        personInfoModel.find({firstName: request.params.userName}).exec(function(err,res){
            if(err){
                response.status = 500;
                response.send({status:response.status, error:err});
            }
            response.send({status:200, data:res});
        });
    }

}