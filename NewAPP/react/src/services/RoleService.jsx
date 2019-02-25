class RoleService{

    postRole(role, token){
        let promise = fetch("http://localhost:4040/api/role", {
                                method:"POST",
                                headers:{
                                    "content-type":"application/json",
                                    "Authorization":"bearer "+token
                                },
                                body:JSON.stringify(role)
                            });
        return promise;
    }


    getRoles(token){
        let promise = fetch("http://localhost:4040/api/role",{
                            method:"GET",
                            headers:{
                                "Authorization":"bearer "+token
                            },
                        });
        return promise;
    }
}

export default RoleService;