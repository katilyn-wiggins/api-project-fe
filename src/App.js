import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Home/home.js';
import Login from './Auth/login.js';
import Signup from './Auth/signup.js';
import Plants from './Search/plants.js';
import Favorites from './Favorites/favoriteList.js';
import Header from './Components/header.js';
import PrivateRoute from './Components/private-route.js';
import {
  getUserFromLocalStorage,
  putUserInLocalStorage
} from './local-storage-utils';

export default class App extends React.Component {
  state = {
    user: getUserFromLocalStorage()
  };

  handleUserChange = (user) => {
    this.setState({ user });

    putUserInLocalStorage(user);
  };

  handleUserLogout = () => {
    this.handleUserChange();
  };

  render() {
    return (
      <div>
        <Router>
          <Header />
          <Switch>
            <Route
              path="/"
              exact
              render={(routerProps) => <Home {...routerProps} />}
            />
            <Route
              path="/login"
              exact
              render={(routerProps) => (
                <Login
                  handleUserChange={this.handleUserChange}
                  {...routerProps}
                />
              )}
            />
            <Route
              path="/signup"
              exact
              render={(routerProps) => (
                <Signup
                  handleUserChange={this.handleUserChange}
                  {...routerProps}
                />
              )}
            />
            <PrivateRoute
              path="/search"
              exact
              token={this.state.user && this.state.user.token}
              render={(routerProps) => (
                <Plants user={this.state.user} {...routerProps} />
              )}
            />
            <PrivateRoute
              path="/favorites"
              exact
              token={this.state.user && this.state.user.token}
              render={(routerProps) => (
                <Favorites user={this.state.user} {...routerProps} />
              )}
            />
          </Switch>
        </Router>
        <footer></footer>
      </div>
    );
  }
}
