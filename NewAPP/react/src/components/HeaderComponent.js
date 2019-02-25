import React, {Component} from 'react';
import {Link} from "react-router-dom";

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          authAdmin: false,
          authOperator: false,
          authAccessOperator: false
         }

        this.token = sessionStorage.getItem("token");
        this.roleName = sessionStorage.getItem("roleName");
        this.userName = sessionStorage.getItem("userName");
     
        if(this.roleName === "Admin") {
        this.state.authAdmin= true
        } else if(this.roleName  === "Operator"){
            this.state.authOperator = true
        } else if(this.roleName  === "AccessUser"){
        this.state.authAccessOperator= true
        }
    }

    render() { 
        return (
            
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <Link className="navbar-brand" to="/dashboard">PIM</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/dashboard">Dashboard <span className="sr-only">(current)</span></Link>
                    </li>
                    { this.state.authAdmin &&
                    <li className="nav-item">
                        <Link className="nav-link" to="/role">Roles</Link>
                    </li>
                    }
                    { !this.state.authAccessOperator &&
                    <li className="nav-item">
                        <Link className="nav-link" to="/users">Create User</Link>
                    </li>
                    }
                    { !this.state.authAccessOperator &&
                    <li className="nav-item">
                        <Link className="nav-link" to="/userlist">List User</Link>
                    </li>
                    }
                    { this.state.authAdmin &&
                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Person
                        </Link>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link className="dropdown-item" to="/personapproved">Approved</Link>
                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" to="/personpending">Pending</Link>
                        </div>
                    </li>
                    }
                     { this.state.authAccessOperator &&
                    <li className="nav-item">
                        <Link className="nav-link" to="/listperson">My Profile Info</Link>
                    </li>
                    }
                    {/* <li>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button></input></form></li> */}
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Hello {this.userName}
                        </Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <Link className="dropdown-item" to="/logout">Logout</Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
         );
    }
}
 
export default HeaderComponent;