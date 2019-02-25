class LoginService{

    userAuth(usr){
        //console.log(usr);
        
        let promise = fetch("http://localhost:4040/api/users/auth", {
                                method:"POST",
                                headers:{
                                    "content-type":"application/json"
                                },
                                body:JSON.stringify(usr)
                            });
        return promise;
    }
}

export default LoginService;