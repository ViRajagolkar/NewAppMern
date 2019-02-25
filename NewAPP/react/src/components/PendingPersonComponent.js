import React, { Component } from 'react';
import PersonService from "./../services/PersonService.jsx";
import HeaderComponent from "./HeaderComponent.js";
import FooterComponent from "./FooterComponent.js";

class PendingPersonComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            persons:[]
         }

         this.serv = new PersonService();
         this.token = sessionStorage.getItem("token");
         this.roleName = sessionStorage.getItem("roleName");
         
         var h = this.props.history;
         
         if(this.token==="" || this.token===null || this.roleName==="" || this.roleName===null){
              h.push('/login');
         }

          this.status = "pending";
    }

    componentDidMount(){
        this.serv.getPersonInfoByStatus(this.status, this.token)
                      .then((data) => data.json())
                      .then((value) => {
                        if(value.status===200){
                          this.setState({persons:[]});
                          this.setState({persons:value.data})
                          //console.log(value.data);
                      }
                      else{
                        this.setState({errorMsg: value.message});
                        this.setState({persons:[]});
                      }
                    }).catch(error => {
                          console.log(`Error occured ${error.status}`);
                    });
    }

     onClickGetApprovedPerson(userId){
        this.serv.doApprovePerson(userId, this.token)
                                .then((data) => data.json())
                                .then((value) =>{
                                  alert(`${value.message}`);
                                  window.location.reload();
                                }).catch(error => {
                                  console.log(`Error Status ${error.status}`);
                                })
    }

    onClickGetRejectedPerson(userId){
      this.serv.doRejectPerson(userId, this.token)
                              .then((data) => data.json())
                              .then((value) =>{
                                    alert(`${value.message}`);
                                    window.location.reload();
                                  console.log(value.data)
                                }).catch(error => {
                                  console.log(`Error Status ${error.status}`);
                                })


    }

    render() { 
        return ( 
            <div className="container page-backcolor">
          <HeaderComponent />

            <div className="main-content">
                <div className="row">
            <table className="table table-borderd table-striped">
                  <thead>
                      <tr>
                          <th>User Id</th>
                          <th>UserName</th>
                          <th>DOB</th>
                          <th>Mobile</th>
                          <th>Email</th>
                          <th>City</th>
                          <th>Actions</th>
                      </tr>
                  </thead>
                    <tbody>
                        {
                            this.state.persons.map((u, i) => (
                                <TableRow key={i} row={u} approve={this.onClickGetApprovedPerson.bind(this)} reject={this.onClickGetRejectedPerson.bind(this)}>
                                </TableRow>
                            ))
                        }
                    </tbody>
              </table>
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

    onRowClickApprove(){
      this.props.approve(this.props.row.userId)
    }

    
    onRowClickReject(){
      this.props.reject(this.props.row.userId);
    }
  
    render() {
      return (
        <tr>
        {Object.values(this.props.row).map((r, idx) =>(
          r === "pending" ? r !== "userId" ?
          <td key={idx}> 
            <button className="btn btn-success" onClick={this.onRowClickApprove.bind(this)}>Approve</button>&nbsp;
            <button className="btn btn-danger" onClick={this.onRowClickReject.bind(this)} value="reject">Reject</button>
          </td>
            : null
            : <td key={idx}> {r} </td>
          ))
        } 
        
      </tr>
      );
    }
  }
 
export default PendingPersonComponent;