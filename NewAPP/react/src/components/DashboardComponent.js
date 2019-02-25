import React, {Component} from 'react';
import HeaderComponent from './HeaderComponent.js';
import FooterComponent from './FooterComponent.js';

class DashboardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  }

        this.token = sessionStorage.getItem("token");
        this.roleName = sessionStorage.getItem("roleName");
    
        if(this.token==="" || this.token===null || this.roleName==="" || this.roleName===null){
            var h = this.props.history;
            h.push('/login');
        }
    }
    render() { 
        return ( 
            
            <div className="container page-backcolor">
                <HeaderComponent/>

                <div className="main-content">
                    <h1>Welcome to Dashboard</h1>
                </div>
                <FooterComponent/>
            </div>
         )
    }
}
 
export default DashboardComponent;