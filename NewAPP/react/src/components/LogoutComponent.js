import React, { Component } from 'react';

class LogoutComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 

         }

            this.token = sessionStorage.clear();
            var h = this.props.history;
            h.push('/login');

    }
    render() { 
        return ( 
            <div>
                
            </div>
         );
    
    }
}
 
export default LogoutComponent;