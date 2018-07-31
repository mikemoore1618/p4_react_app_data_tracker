import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import httpClient from './httpClient'
import Navbar from './NavBar'
import SignUp from './views/SignUp'
import LogIn from './views/LogIn'
import Metrics from './views/Metrics'
import LogOut from './views/LogOut'
import Create from './views/Create'
import { Container } from 'semantic-ui-react';

class App extends Component {
  state = {
    currentUser: httpClient.getCurrentUser()
  }

  onAuthSuccess() {
    this.setState({ currentUser: httpClient.getCurrentUser() })
  }

  onLogOutSuccess() {
    this.setState({ currentUser: null })
  }

  render() {
    return (
      <Container>
        <Navbar currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/signup' render={(routeProps) => {
            return <SignUp {...routeProps} onSignUpSuccess={this.onAuthSuccess.bind(this)} />
          }} />
          <Route exact path='/login' render={(routeProps) => {
            return <LogIn {...routeProps} onLogInSuccess={this.onAuthSuccess.bind(this)} />
          }} />
          {/* <Route exact path='/metrics' render={(routeProps) => {
            return this.state.currentUser
            ? <Metrics {...routeProps}/>
            : <Redirect to="/login" />
          }} /> */}
          <Route exact path='/metrics/new' render={(routeProps) => {
            return this.state.currentUser
              ? <Create {...routeProps} />
              : <Redirect to="/login" />
          }} />
          {/* <Route exact path='/metrics/:id/edit' render={(routeProps) => {
            return this.state.currentUser
            ? <Edit {...routeProps}/>
            : <Redirect to="/login" />
          }} /> */}
          <Route exact path='/metrics/:id' render={(routeProps) => {
            return this.state.currentUser
              ? <Metrics {...routeProps} />
              : <Redirect to="/login" />
          }} />
          <Route exact path='/logout' render={(routeProps) => {
            return <LogOut {...routeProps} onLogOutSuccess={this.onLogOutSuccess.bind(this)} />
          }} />
          <Route exact path='/' render={() => {
            return this.state.currentUser
              ? <Metrics />
              : <Redirect to="/login" />
          }} />
        </Switch>
      </Container>
    );
  }
}

export default App;
