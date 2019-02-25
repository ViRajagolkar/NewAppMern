import React, { Component } from "react";
import HeaderComponent from "./HeaderComponent.js";
import FooterComponent from "./FooterComponent.js";
import RoleService from "./../services/RoleService.jsx";


class RoleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roleid: "",
      rolename: "",
      errorMsg: "",
      successMsg: "",
      roles: []
    };

    this.serv = new RoleService();
    this.token = sessionStorage.getItem("token");
    this.roleName = sessionStorage.getItem("roleName");
    
    if(this.token==="" || this.token===null || this.roleName==="" || this.roleName===null){
        var h = this.props.history;
        h.push('/login');
    }
  }

  OnPropertyChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  RoleSubmit() {
    if (this.state.rolename === "") {
      this.setState({ errorMsg: "Please Enter Product Name" });
    } else {
      var role = {
        roleName: this.state.rolename
      };

      this.serv.postRole(role, this.token)
            .then(res => res.json())
            .then(res => {
              if (res.status === 200) {
                console.log(res.message)
                //this.setState({ successMsg: res.message });
                this.onClickRefresh();
              } else {
                this.setState({ errorMsg: res.message });
              }
          });
      }
  }

  onClickClear(e) {
    this.setState({ rolename: "" });
    this.setState({ errorMsg: "" });
    this.setState({ successMsg: "" });
  }

  componentDidMount() {
        this.serv.getRoles(this.token)
              .then(data => data.json())
              .then(value => {
              //console.log(JSON.stringify(value.data));
              this.setState({ roles: value.data });
          })
          .catch(error => {
              console.log(`Error Status ${error.status}`);
          });
  }

  onClickRefresh(){
    window.location.reload();  
  }

  render() {
    return (
      <div className="container page-backcolor">
        <HeaderComponent />

        <div className="main-content">
          <div className="row">
            <div className="col-md-6">
                <div className="error">{this.state.errorMsg}</div>
                <div className="success">{this.state.successMsg}</div>
              <form>
                <div className="form-group">
                  <label htmlFor="rolename"> Role Name </label>
                  <input
                    type="text"
                    className="form-control"
                    name="rolename"
                    value={this.state.rolename}
                    onChange={this.OnPropertyChange.bind(this)}
                  />
                </div>
                <input
                  type="button"
                  value="Submit"
                  className="btn btn-success"
                  onClick={this.RoleSubmit.bind(this)}
                />
                &nbsp;
                <input
                  type="button"
                  value="Clear"
                  className="btn btn-primary"
                  onClick={this.onClickClear.bind(this)}
                />
              </form>
            </div>

            <div className="col-md-6 border-table role-border">
              <table className="table table-bordered table-striped">
                <thead>
                {/* <input type="button" value="refresh" onClick={this.onClickRefresh}/> */}
                  <tr>
                    <th>Role Id</th>
                    <th>Role Name</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.roles.map((r, i) => (
                    <TableRow key={i} row={r} roles={this.state.roles}></TableRow>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <FooterComponent />
      </div>
    );
  }
}

class TableRow extends Component {
  constructor(props) {
    super(props);
    this.state={}
  }

  render() {
    return (
      <tr>
        {
          Object.keys(this.props.roles[0]).map((r, i) =>
          r !== "_id" ? r !== "__v" ? <td>{this.props.row[r]}</td> : null : null
        )}
      </tr>
    );
  }
}



export default RoleComponent;
