import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';


class Dashboard extends Component {
  render() {
    return (
      <div className="container-fluid">
      <Route exact path="/dashboard" render={() => (
        <div>
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
                  this.props.history.push("");
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
            <button className="btn btn-outline-success my-2 my-sm-3 mx-sm-2" type="button">
              Hello, {this.props.location.state.email}
            </button>
            
              <button className="btn btn-outline-success my-2 my-sm-3 " type="button">
                Logout
              </button>
            </form>
          </div>
          </nav>

          <h1><p>Welcome to Dashboard!!!</p></h1>
          </div>
        )} />

      </div>
    )
  }
}

export default withRouter(Dashboard);
