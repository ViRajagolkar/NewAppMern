import React, { Component } from "react";
import LoginService from "../services/LoginService.jsx";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMsg: ""
    };

    this.serv = new LoginService();
  }

  OnPropertyChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  UserAuthentication() {
    var usr = {
      userName: this.state.username,
      password: this.state.password,
      ip: "103.76.9.30"
    };
    var h = this.props.history;

    this.serv.userAuth(usr)
          .then(res => res.json())
          .then(res => {
            if (res.status === 200) {    
              sessionStorage.setItem("token", res.token);
              sessionStorage.setItem("roleName",res.roleName);
              sessionStorage.setItem("userId", res.userId);
              sessionStorage.setItem("userName", res.userName);
              
              h.push("/dashboard");
            } else {
              this.setState({ errorMsg: res.message });
            }
          });
    //console.log(userCrd)
  }

  render() {
    return (
      <div className="container change-backpage">
        <div className="col-md-4 login-container change-font-login">
          <h2>
            <center>Login...</center>
          </h2>
          <div className="error">{this.state.errorMsg}</div>
          <form>
            <div className="form-group">
              <label htmlFor="uname"> Username </label>
              <input
                type="text"
                className="form-control"
                name="username"
                onChange={this.OnPropertyChange.bind(this)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="pass"> Password </label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={this.OnPropertyChange.bind(this)}
              />
            </div>

            <input
              type="button"
              value="Login"
              className="btn btn-success"
              onClick={this.UserAuthentication.bind(this)}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default LoginComponent;
