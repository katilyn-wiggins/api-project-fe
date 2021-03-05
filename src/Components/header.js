import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class header extends Component {
  render() {
    return (
      <div>
        <NavLink to="/">Home</NavLink>

        <>
          <NavLink to="/search">Search</NavLink>
          <NavLink to="/favorites">Favorites</NavLink>
          <button onClick={this.props.handleLogout}>Sign Out</button>
        </>

        <>
          <NavLink to="/signup">Sign Up</NavLink>
          <NavLink to="/login">Log In</NavLink>
        </>
      </div>
    );
  }
}
