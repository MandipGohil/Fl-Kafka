import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Userprofile from "./Userprofile";
import Postproject from "./Postproject";
import Dashboardwork from "./Dashboardwork";
import Bidonproject from "./Bidonproject";
import Projectdetails from "./Projectdetails";
import * as API from '../api/API';


class Homepage extends Component {

  componentWillMount(){
    console.log("Willmount Homepage");
    //console.log(this.state);
      API.checklogin()
        .then((response) => {
          console.log(response);
          if(response.status === 201) {
            console.log("Session ok");
            this.props.history.push({
              pathname: '/dashboard',
              state: {
                email: response.email,
                role: response.role
              }
            });
          } else {
            console.log("Session not ok");
            this.props.history.push('/login');
          }
        });
  }


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
        <Route exact path="/postproject" render={() => (
            <div>
                <Postproject />
            </div>
        )}/>
        <Route exact path="/dashboardwork" render={() => (
            <div>
                <Dashboardwork />
            </div>
        )}/>
        <Route exact path="/bidonproject" render={() => (
            <div>
                <Bidonproject />
            </div>
        )}/>
        <Route exact path="/projectdetails" render={() => (
            <div>
                <Projectdetails />
            </div>
        )}/>
      </div>
    )
  }
}
export default withRouter(Homepage);
