import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import LoginComponent from './components/LoginComponent.js';
import DashboardComponent from './components/DashboardComponent.js';
import RoleComponent from './components/RoleComponent.js';
import UserComponent from './components/UserComponent.js';
import UserListComponent from './components/UserList.js';
import PersonInfoComponent from "./components/PersonInfoComponent.js";
import LogoutComponent from './components/LogoutComponent.js';
import PendingPersonComponent from './components/PendingPersonComponent.js';
import ApprovedPersonComponent from './components/ApprovedPersonComponent.js';
import PersonProfileComponent from './components/PersonProfileComponent.js';

const history = createBrowserHistory()

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}

  }
  render() {
    return (
      <div>
        <Router history={history}>

          <Switch>
            <Route exact path='/' component={LoginComponent}/>
            <Route path='/login' component={LoginComponent}/>
            <Route path='/dashboard' component={DashboardComponent}/>
            <Route path='/role' component={RoleComponent}/>
            <Route path='/users' component={UserComponent}/>
            <Route path="/userlist" component={UserListComponent}/>
            <Route path='/logout' component={LogoutComponent}/>
            <Route path='/personinfo/:userId' component={PersonInfoComponent}/>
            <Route path='/personapproved' component={ApprovedPersonComponent}/>
            <Route path='/personpending' component={PendingPersonComponent}/>
            <Route path='/listperson' component={PersonProfileComponent}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
