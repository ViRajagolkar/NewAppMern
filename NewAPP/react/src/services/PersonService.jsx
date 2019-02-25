class PersonService{

        getPersons(token){
            let promise = fetch("http://localhost:4040/api/personinfo",{
                        method:"GET",
                        headers:{
                            "Authorization":"bearer "+token
                        },
                });
            return promise;
        }

        getPersonsInfo(userId, token){
            let promise = fetch("http://localhost:4040/api/personinfo/id/"+userId,{
                        method:"GET",
                        headers:{
                            "Authorization":"bearer "+token
                        },
                });
            return promise;
        }

        postPersons(persons, token){
            let promise = fetch("http://localhost:4040/api/personinfo",{
                        method:"POST",
                        headers:{
                            "content-type":"application/json",
                            "Authorization":"bearer "+token
                        },
                        body:JSON.stringify(persons)
                });
            return promise;
        }

        getPersonInfoByUserId(userId, token){

            let promise = fetch("http://localhost:4040/api/personinfo/byuserid/"+userId, {
                            method:"GET",
                            headers:{  
                                "Authorization":"bearer "+token
                            }, 
                        });
                    return promise;  
        }   
        
        getPersonInfoByStatus(status,token){
            //console.log("Status :", status);
            
            let promise = fetch("http://localhost:4040/api/personinfo/"+status,{
                                    method:"GET",
                                    headers:{
                                        "Authorization":"bearer "+token
                                    },
                                });
            return promise;
        }

        doApprovePerson(userId, token){
           
            let promise = fetch("http://localhost:4040/api/temppersoninfo/approve/"+userId,{
                                method: "GET",
                                headers:{
                                    "Authorization":"bearer "+token
                                }
            })
            
            return promise;
        }

        doRejectPerson(userId, token){

            let promise = fetch("http://localhost:4040/api/temppersoninfo/reject/"+userId,{
                                method: "DELETE",
                                headers:{
                                    "Authorization":"bearer "+token
                                }
            })
            
            return promise;
        }

        searchByUserName(userName, token){
            //console.log(userName);
            let promise = fetch("http://localhost:4040/api/searchuser/"+userName,{
                    method:"POST",
                    headers:{
                        "content-type":"application/json",
                        "Authorization":"bearer "+token
                    },
                    body:JSON.stringify(userName)
            })
            return promise;
        }
}


export default PersonService;