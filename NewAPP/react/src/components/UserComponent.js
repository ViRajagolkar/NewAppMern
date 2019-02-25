import React, {Component} from 'react';
import HeaderComponent from './HeaderComponent.js';
import FooterComponent from './FooterComponent.js';
import UserService from './../services/UserService.jsx';

const initialState = {
    userId: "",
    userName: "",
    emailAddress: "",
    password:"",
    role:"",
    errorMsg:"",
    successMsg:""
}

class UserComponent extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;

        this.serv = new UserService();
        this.token = sessionStorage.getItem("token");
        this.roleName = sessionStorage.getItem("roleName");

        if(this.token==="" || this.token===null || this.roleName==="" || this.roleName===null){
            var h = this.props.history;
            h.push('/login');
        }
    }

    OnPropertyChange(e){
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    onClickSubmit(){
        if(this.state.userName===""){
            this.setState({errorMsg: "Please Enter User Name"});
        }
        else if(this.state.emailAddress===""){
            this.setState({errorMsg: "Please Enter Email"});
        }
        else if(this.state.password===""){
            this.setState({errorMsg: "Please Enter Password"});
        }
        else if(this.state.role===""){
            this.setState({errorMsg: "Please Enter Role"});
        }
        else{
            var user = {
                userName:this.state.userName,
                emailAddress:this.state.emailAddress,
                password:this.state.password,
                roleName:this.state.role
            }           
    
           this.serv.postUsers(user, this.token).then(res=>res.json())
                                                        .then(res=>{
                                                        if(res.status===200){
                                                            this.setState({successMsg: res.message});
                                                        }
                                                        else{
                                                            this.setState({errorMsg: res.message});
                                                        } 
                                                    });
             }
    }

    onClickClear(){
        this.setState(initialState);
    }

    render() { 
        return ( 
            <div className="container page-backcolor">
                <HeaderComponent/>
                <div className="main-content">
                    <div className="row">
                        <div className="col-md-3">
                        </div>
                        <div className="col-md-5">
                            <div className="error">{this.state.errorMsg}</div>
                            <div className="success">{this.state.successMsg}</div>
                                <form>
                                    <div className="form-group"> 
                                        <label htmlFor="userName">UserName</label>
                                        <input type="text" className="form-control" name="userName" value={this.state.userName} onChange={this.OnPropertyChange.bind(this)}/>
                                    </div>

                                    <div className="form-group"> 
                                        <label htmlFor="emailAddress">Email Address</label>
                                        <input type="text" className="form-control" name="emailAddress" value={this.state.emailAddress} onChange={this.OnPropertyChange.bind(this)}/>
                                    </div>

                                    <div className="form-group"> 
                                        <label htmlFor="pass">Password</label>
                                        <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.OnPropertyChange.bind(this)}/>
                                    </div>

                                    <div className="form-group"> 
                                        <label htmlFor="role">Role Name</label>
                                        <select name="role" id="role" value={this.state.role} className="form-control" tabIndex="14" onChange={this.OnPropertyChange.bind(this)}>
                                            <option value=""> select role </option>
                                            <option value="Admin"> Admin </option>
                                            <option value="Operator"> Operator </option>
                                            <option value="AccessUser"> AccessUser </option>
                                        </select>
                                    </div>

                                    <input type="button" value="Submit" className="btn btn-success" onClick={this.onClickSubmit.bind(this)}/> &nbsp;
                                    <input type="button" value="Clear" className="btn btn-primary" onClick={this.onClickClear.bind(this)}/>
                                </form>
                        </div>
                    </div> 
                </div>
                <FooterComponent/>
            </div>
         );
    }
}
 
export default UserComponent;