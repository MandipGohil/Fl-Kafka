import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import './style_Login.css';
import * as API from '../api/API';

class Signup extends Component {

  state = {
      name: '',
      email: '',
      password: '',
      conpassword: '',
      role:'hire',
      isLoggedIn: false,
      message: ''
  };
  // After Click on Login this function call
      signup = (userdata) => {
          API.signup(userdata)
          .then((response) => {
            console.log(response);
                if (response.status === 201) {
                    this.setState({
                        isLoggedIn: true,
                        message: response.msg
                    });
                    this.props.history.push({
                      pathname: '/login',
                      state: {
                        name: this.state.name,
                        email: this.state.email,
                        role: this.state.role
                      }
                    });
                } else if (response.status === 401) {
                    this.setState({
                        isLoggedIn: false,
                        message: response.msg
                    });
                    console.log(this.state);
                }
          });
          console.log("Signup Function call");
      };

  render() {
    return (
      <div>
      <Route exact path="/signup" render={() => (
      <div className="login-form">
        <h1>Sign Up</h1>
        <div className="form-group ">
          <input type="text" className="form-control" placeholder="Name" id="name" name="name"
          value={this.state.name}
            onChange={(event) => {
                this.setState({
                    name: event.target.value
                });
            }}/>
            <i className="fa fa-user"></i>
        </div>
          <div className="form-group ">
            <input type="email" className="form-control" placeholder="Email " id="email" name="email"
            value={this.state.email}
              onChange={(event) => {
                  this.setState({
                      email: event.target.value
                  });
              }}/>
              <i className="fa fa-user"></i>
          </div>
          <div className="form-group log-status">
            <input type="password" className="form-control" placeholder="Password" id="password" name="password"
            value={this.state.password}
              onChange={(event) => {
                  this.setState({
                      password: event.target.value
                  });
              }}/>
            <i className="fa fa-lock"></i>
          </div>
          <div className="form-group log-status">
            <input type="password" className="form-control" placeholder="Confirm-Password" id="conpassword" name="conpassword"
            value={this.state.conpassword}
              onChange={(event) => {
                  this.setState({
                      conpassword: event.target.value
                  });
              }}/>
            <i className="fa fa-lock"></i>
          </div>

            <div className="form-check form-check-inline col-md-4">
                <input className="form-check-input " type="radio" name="role" id="hire" value="hire" checked
                  onChange={(event) => {
                      this.setState({
                          role: event.target.value
                      });
                  }}/>
                <label className="form-check-label">Hire</label>
              </div>
              <div className="form-check form-check-inline col-md-7">
                <input className="form-check-input" type="radio" name="role" id="work" value="work"
                  onChange={(event) => {
                      this.setState({
                          role: event.target.value
                      });
                  }}/>
                <label className="form-check-label">Work</label>
              </div>

              <button type="button" className="log-btn mb-4"
                      onClick={() => this.signup(this.state)}>
                  Sign Up
              </button>

              <div>
                  <button type="button" className="btn-danger">
                      {this.state.message}
                  </button>
              </div>
          </div>

        )} />
      </div>
    )
  }
}
export default withRouter(Signup);
