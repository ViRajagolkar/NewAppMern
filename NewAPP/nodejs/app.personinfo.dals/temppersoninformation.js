var mongoose = require("mongoose");
    //autoIncrement = require("mongoose-auto-increment");
    require("./../app.personinfo.models/person.model");
var TempPersonInfoModel = mongoose.model("TempPersonInfo");

module.exports={

    getTempPersons:function(request, response){
        TempPersonInfoModel.find().exec(function(err,res){
                if(err){
                    response.status = 500;
                    response.send({status:response.status, error:err});
                }
                res.dateOfBirth
                response.send({status:200, data:res});
            });
        },
    
    deleteTempPersons:function(request, response){
        let condition ={
            personId= request.params.personId
        }

        TempPersonInfoModel.deleteOne(condition, function(err, res){
            if (err) {
                response.statuscode = 404;
                response.send({ status: response.statuscode, error: err });
              }
             
              response.statuscode = 200;
              response.send({ status: response.statuscode, data: res, message: "User is Rejected...!" });
            });        
        }
}