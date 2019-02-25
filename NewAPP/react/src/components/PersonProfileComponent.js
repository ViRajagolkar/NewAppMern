import React, { Component } from 'react';
import HeaderComponent from './HeaderComponent.js';
import FooterComponent from './FooterComponent.js';
import PersonService from '../services/PersonService.jsx';


class PersonProfileComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
               personId:"",
               firstName:"",
               middleName:"",
               lastName:"",
               gender:"",
               dob:"",
               age:"",
               flatNumber:"",
               societyName:"",
               areaName:"",
               city:"",
               state:"",
               pinCode:"",
               email:"",
               phoneNo:"",
               mobileNo:"",
               physicalDisability:"",
               maritalStatus:"",
               education:"",
               birthSign:"",
               userId:""
        }

         this.serv = new PersonService();
         this.token = sessionStorage.getItem("token");
         this.roleName = sessionStorage.getItem("roleName");
         this.userId = sessionStorage.getItem("userId");
         console.log(this.userId);
         
         if(this.token==="" || this.token===null || this.roleName==="" || this.roleName===null){
             var h = this.props.history;
             h.push('/login');
         }
    }

    componentDidMount(){
        this.serv.getPersonsInfo(this.userId, this.token)
        .then((data) => data.json())
        .then((value) => {
            if(value.status === 200) {
            let valueInfo = value.data;
                this.setState({
                    personId:valueInfo[0].personId,
                    firstName:valueInfo[0].firstName,
                    middleName:valueInfo[0].middleName,
                    lastName:valueInfo[0].lastName,
                    dob:valueInfo[0].dob,
                    gender:valueInfo[0].gender,
                    age:valueInfo[0].age,
                    flatNumber:valueInfo[0].flatNumber,
                    societyName:valueInfo[0].societyName,
                    areaName:valueInfo[0].areaName,
                    city:valueInfo[0].city,
                    state:valueInfo[0].state,
                    email:valueInfo[0].email,
                    pinCode:valueInfo[0].pinCode,
                    mobileNo:valueInfo[0].mobileNo,
                    phoneNo:valueInfo[0].phoneNo,
                    physicalDisability:valueInfo[0].physicalDisability,
                    maritalStatus:valueInfo[0].maritalStatus,
                    education:valueInfo[0].education,
                    birthSign:valueInfo[0].birthSign,
                    isAuthorized:valueInfo[0].isAuthorized
                    });
                }
            })
    }

   render() { 
        return ( 
            <div className="container page-backcolor">
                <HeaderComponent/>

                <div className="main-content">
                    <div className="row">
                    <div className="col-md-2">
                  </div>
                        <div className="col-md-8">
                        <h3 className="perinfo-title">Person Information</h3>
                        <table className="table table-bordered table-striped">
                                    <tbody>
                                         <tr>
                                            <td>Person Id</td>
                                            <td>{this.state.personId}</td>
                                         </tr> 
                                         <tr>
                                            <td>Full Name</td>
                                            <td>{this.state.firstName} {this.state.middleName} {this.state.lastName}</td>
                                         </tr> 
                                         <tr>
                                            <td>Gender</td>
                                            <td>{this.state.gender}</td>
                                         </tr>
                                         <tr>
                                            <td>Date Of Birth</td>
                                            <td>{this.state.dob}</td>
                                         </tr>
                                         <tr>
                                            <td>Age</td>
                                            <td>{this.state.age}</td>
                                         </tr> 
                                         <tr>
                                            <td>Address</td>
                                            <td>{this.state.flatNumber}, {this.state.societyName}, {this.state.areaName}</td>
                                         </tr>
                                         <tr>
                                            <td>City</td>
                                            <td>{this.state.city}</td>
                                         </tr>
                                         <tr>
                                            <td>State</td>
                                            <td>{this.state.state}</td>
                                         </tr>
                                         <tr>
                                            <td>Pincode</td>
                                            <td>{this.state.pinCode}</td>
                                         </tr>
                                         <tr>
                                            <td>Email</td>
                                            <td>{this.state.email}</td>
                                         </tr>
                                         <tr>
                                            <td>Phone No</td>
                                            <td>{this.state.phoneNo}</td>
                                         </tr>
                                         <tr>
                                            <td>Mobile No</td>
                                            <td>{this.state.mobileNo}</td>
                                         </tr>
                                         <tr>
                                            <td>Physical Disability</td>
                                            <td>{this.state.physicalDisability}</td>
                                         </tr>
                                         <tr>
                                            <td>Marital Status</td>
                                            <td>{this.state.maritalStatus}</td>
                                         </tr>
                                         <tr>
                                            <td>Education</td>
                                            <td>{this.state.education}</td>
                                         </tr>
                                         <tr>
                                            <td>Birth Sign</td>
                                            <td>{this.state.birthSign}</td>
                                         </tr>
                                    </tbody>
                                </table>
                        </div>
                    </div>
                </div>
                <FooterComponent/>    
            </div>
         );
    }
}
 
export default PersonProfileComponent;