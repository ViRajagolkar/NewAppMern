import React, { Component } from 'react';
import HeaderComponent from './HeaderComponent.js';
import FooterComponent from './FooterComponent.js';
import UserService from "./../services/UserService.jsx";

class UserListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
         }
         this.serv = new UserService();
         this.token =sessionStorage.getItem("token");
         this.roleName = sessionStorage.getItem("roleName");

         if(this.token==="" || this.token===null || this.roleName==="" || this.roleName===null){
          var h = this.props.history;
          h.push('/login');
      }
    }

    getUserInfo(userId){
        var h = this.props.history;
        console.log(h);
        h.push('/personinfo/'+userId);
    }

    removeUserInfo(userId){
      this.serv.removeUser(userId, this.token)
                      .then((data) => data.json())
                      .then((value)=>{
                        this.setState({users:value.data})
                      })
                      .catch(error =>{
                          console.log(`Error Status ${error.status}`);
                      });
    }

    componentDidMount(){
          this.serv.getUsers(this.token)
                            .then((data) => data.json())
                            .then((value)=>{
                               this.setState({users:value.data})
                            })
                            .catch(error =>{
                                console.log(`Error Status ${error.status}`);
                            });
    }


    render() { 
        return ( 
            <div className="container page-backcolor">
            <HeaderComponent/>
            <div className="main-content">
            <div className="col-md-9 user-margin border-table">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                            <th>User Id</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>RoleId</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                    <tbody>
                        {
                        this.state.users.map((r,i)=>(
                        <TableRow key={i}  row={r}  rec={this.state.users} add={this.getUserInfo.bind(this)} remove={this.removeUserInfo.bind(this)}></TableRow>
                        ))
                        }
                        
                    </tbody>
                    </table>
                </div>
                </div>
            <FooterComponent/>
        </div>
         );
    }
}

class TableRow extends Component {
    constructor(props) {
      super(props);
      this.state={}
      this.roleName = sessionStorage.getItem("roleName");
    }

    onRowClickAdd(){
      this.props.add(this.props.row.userId);
    }

    onRowClickRemove(){
      this.props.remove(this.props.row.userId);
    }
  
    render() {
      return (
        <tr>
          {Object.keys(this.props.rec[0]).map((r, i) =>
            r !== "_id" ? r !== "__v" ? r !== "password" ? <td>{this.props.row[r]}</td> : null : null : null
          )}
          <td><input type="button" value="Add Info" className="btn btn-success" onClick={this.onRowClickAdd.bind(this)}></input> &nbsp;
          {this.roleName === "Admin" ?
          <input type="button" value="Remove" className="btn btn-danger" onClick= {this.onRowClickRemove.bind(this)}></input>
          : null}
          </td>
        </tr>
      );
    }
  }

export default UserListComponent;