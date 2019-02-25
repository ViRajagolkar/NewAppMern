import React, { Component } from 'react';
import PersonService from "./../services/PersonService.jsx";
import HeaderComponent from "./HeaderComponent.js";
import FooterComponent from "./FooterComponent.js";

class ApprovedPersonComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            persons:[],
            search:""
         }

         this.serv = new PersonService();
         this.token = sessionStorage.getItem("token");
         this.roleName = sessionStorage.getItem("roleName");
        
          if(this.token==="" || this.token===null || this.roleName==="" || this.roleName===null){
              var h = this.props.history;
              h.push('/login');
          }
         this.status = "approved";
    }

  OnPropertyChange(e){
      this.setState({
        [e.target.name]:e.target.value
    });
  }

    componentDidMount(){
      this.serv.getPersonInfoByStatus(this.status, this.token)
                    .then((data) => data.json())
                    .then((value) => {if(value.status===200){
                        this.setState({persons:[]});
                        this.setState({persons:value.data})
                    }
                    else{
                      this.setState({errorMsg: value.message});
                      this.setState({persons:[]});
                    }
                  }).catch(error => {
                        console.log(`Error occured ${error.status}`);
                  });
  }

  onClickGetSelectedPerson(userId){
      this.setState({userId: this.props.userId});
      var h = this.props.history;
      h.push('/personinfo/'+userId);
  }

  searchHandler(e) {
    this.setState({ search: e.target.value });
  }

  searchByUserName(e) {
    //console.log(JSON.stringify(this.state.persons));
    var criteria = this.state.search;
    //console.log(criteria);
    var temparr = this.state.persons.filter(ele => {
      return ele.fullName === criteria;
    });
    this.setState({ persons: temparr });
    //console.log(this.state.users);
  }

    render() { 
        return ( 
          <div className="container page-backcolor">
          <HeaderComponent />
          <div className="main-content">
                <div className="row">
            <div>
                  <input type="search" className="form-control mr-sm-2" name="search" id="search" placeholder="Search user name" aria-label="Search" value={this.state.search} onChange={this.searchHandler.bind(this)}/>
              </div>
              <div>
                  <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.searchByUserName.bind(this)}>Search</button>
            </div>
                <table className="table table-borderd table-striped">
                      <thead>
                        <tr>
                            <th>UserId</th>
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
                            this.state.persons.map((r, i) => (
                                <TableRow key={i} row={r} selected={this.onClickGetSelectedPerson.bind(this)} >
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

    onRowClick(){
      this.props.selected(this.props.row.userId);
    }
  
    render() {
      return (
        <tr>
        {
          Object.values(this.props.row).map((r, idx) =>(
          r === "approved" ?
          <td key={idx}>
            <button className="btn btn-warning" onClick={this.onRowClick.bind(this)}>View Info</button>
          </td> 
          :
          <td key={idx}> {r} </td>
          ))
        }
      </tr>
      );
    }
  }
 
export default ApprovedPersonComponent;