import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import './style_Login.css';
import Dashboard from "./Dashboard";
import Userprofile from "./Userprofile";
import * as API from '../api/API';

class Login extends Component {

  state = {
      //name: this.props.location.state.name,
      name:'',
      email: '',
      password: '',
      isLoggedIn: false,
      message: ''
  };

  componentWillMount(){
      this.setState({
        email: '',
        password: '',
        isLoggedIn: false,
        message: ''
      });
  }

  // After Click on Login this function call
      login = (userdata) => {
        console.log(userdata);
          API.login(userdata)
          .then((response) => {
            console.log(response);
                if (response.status === 201) {
                    this.setState({
                        isLoggedIn: true,
                        message: response.msg
                    });
                    this.props.history.push({
                      pathname: '/userprofile',
                      state: {
                        email: this.state.email,
                        name: this.state.name
                      }
                  });
                } else if (response.status === 401) {
                    this.setState({
                        isLoggedIn: false,
                        message: response.msg
                    });
                    console.log(this.state);
                }
          })
          .then(() => {

          });
          console.log("Back to login Function");
      };

  render() {
    return (
      <div>
            <Route exact path="/login" render={() => (
            <div className="login-form">
              <h1>Login</h1>
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
                    <button type="button"
                            className="log-btn mb-4"
                            onClick={() => this.login(this.state)}>
                        Log in
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
export default withRouter(Login);
