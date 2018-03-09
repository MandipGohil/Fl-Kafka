import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Userprofile from "./Userprofile";
import {createStore} from "redux";
import {connect} from 'react-redux';
import {addTodo} from "../actions/index";

import TodoItem from "./TodoItem";

class Homepage extends Component {
  render() {
    return (
      <div className="container-fluid">
      <Route exact path="/" render={() => (
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="">FreeLancer</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                  <button type="button" className="my-2 mx-sm-2 btn-outline-info"
                  onClick={() => {
                    console.log("ON Click!!!!!!");
                    this.props.history.push("/");
                  }}>
                    Home
                  </button>
              </li>
              <li className="nav-item active">
                  <button type="button" className="my-2 mx-sm-2 btn-outline-info"
                  onClick={() => {
                    console.log("ON Click!!!!!!");
                    this.props.history.push("/dashboard");
                  }}>
                    Dashboard
                  </button>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <button className="btn btn-outline-success my-2 mx-sm-3" type="button"
                    onClick={() => {
                      console.log("ON Click!!!!!!");
                      this.props.history.push("/login");
                }}>
                Login
              </button>

              <button className="btn btn-outline-success my-2 my-sm-0" type="button"
                    onClick={() => {
                      console.log("ON Click Signup!!!!!!");
                      this.props.history.push("/signup");
                    }}>
                Signup
              </button>
            </form>
          </div>
          </nav>
        )} />

        <Route exact path="/login" render={() => (
            <div>
                <Login />
            </div>
        )}/>

        <Route exact path="/signup" render={() => (
            <div>
                <Signup />
            </div>
        )}/>
        <Route exact path="/dashboard" render={() => (
            <div>
                <Dashboard />
            </div>
        )}/>

        <Route exact path="/userprofile" render={() => (
            <div>
                <Userprofile />
            </div>
        )}/>
      </div>
    )
  }
}
export default withRouter(Homepage);
