import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import * as API from '../api/API';

class Dashboardwork extends Component {

  state = {
    email: '',
    role: '',
    tmp: [ "Ford", "BMW", "Fiat" ],
    projects: [],
    bidprojects: []
  }
  componentWillMount(){
      API.checklogin()
        .then((response) => {
          console.log(response);
          if(response.status === 201) {
            console.log("Its ok");
            this.setState({
              email: response.email,
              role: response.role
            });
            console.log(`DashboardWork: email --> ${this.state.email} ** role --> ${this.state.role}`);

            API.getworkProjects(this.state)
                      .then((response) => {
                          //alert("got this"+response.projects[0].email);
                          //console.log(response);
                          this.setState({
                            projects:response.projects
                          });
                          console.log(`one ---> ${this.state.projects[0]}`);
                      });

            API.getprojectsthatbid(this.state)
                      .then((response) => {
                          //alert("got this"+response.projects[0].email);
                          //console.log(response);
                          this.setState({
                            bidprojects:response.bidprojects
                          });
                          console.log(`one ---> ${this.state.bidprojects[0]}`);
                      });


          } else {
            console.log("Its not ok forward to login page");
            this.props.history.push('/login');
          }
        });
  }

  //forward
  forwardpath = (email,projectname) => {
    this.props.history.push({
      pathname: '/bidonproject',
      state: {
        email: email,
        projectname: projectname
      }
    });
  }
  //Logout Function
  logout = () => {
    console.log("Log out function");
    API.logout()
    .then((response) => {
      if(response.status === 201) {
        this.props.history.push('/');
      } else if (response.status === 401) {
          this.setState({
              message: response.msg
          });
      }
    });
    console.log("Back to Logout Function");
  };

  render() {
    var self = this;
    console.log("self -->" + self);
  //  console.log(self.callit());
    return(
      <div className="container-fluid">
      <Route exact path="/dashboardwork" render={() => (
        <div className="mt-5 pt-5">
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
                  this.props.history.push({
                    pathname: '/dashboardwork',
                    state: {
                      email: this.state.email,
                      role: this.state.role
                    }
                  });
                }}>
                  Dashboard
                </button>
            </li>
          </ul>
            <form className="form-inline my-2 my-lg-0">

            <button className="btn btn-outline-success my-2 my-sm-3 mx-sm-2" type="button"
            onClick={() => {
              console.log("ON Click Profile Button");
              this.props.history.push({
                pathname: '/userprofile',
                state: {
                  email: this.state.email,
                  role: this.state.role
                }
              });
            }}>
              Hello, {this.state.email}
            </button>

              <button className="btn btn-outline-success my-2 my-sm-3 " type="button"
              onClick={() => this.logout()}>
                Logout
              </button>
            </form>
          </div>
          </nav>

          <div className="w-100">
          <div className="float-left w-50 col-lg-4">
              <div className="w-100 mr-5">
                  <h1 className="lead mt-2 pt-2">
                    <p className="display-4">Open Projects</p>
                  </h1>
              </div>
              <table className="w-50">
                <tbody>
                      <tr>
                            <td><div className="bg-info w-100 mr-5"> Project Title </div></td>
                            <td><div className="bg-info w-100 mr-5"> Employer Email </div></td>
                            <td><div className="bg-info w-100 mr-5"> Budget </div></td>
                            <td><div className="bg-info w-100 mr-5"> Bid </div></td>
                      </tr>
                      <tr>
                      <td>{this.state.projects.map(function(projectObj, index){
                        //  return <div className="btn-outline-success w-100 mr-5 mt-3"> <a onClick={()=> self.forwardpath(projectObj.email, projectObj.projecttitle)}> Bid Now </a></div>
                          return <div className="btn-secondary w-100 mr-5 mt-3"><a onClick={()=> self.forwardpath(projectObj.email, projectObj.projecttitle)}>{projectObj.projecttitle}</a></div>
                        })}</td>

                      <td>{this.state.projects.map(function(projectObj, index){
                                return <div className="bg-secondary w-100 mr-5 mt-3">{projectObj.email}</div>
                        })}</td>
                        <td>{this.state.projects.map(function(projectObj, index){
                                  return <div className="bg-secondary w-100 mr-5 mt-3">{projectObj.maxbudget}</div>
                          })}</td>

                        <td>{this.state.projects.map(function(projectObj, index) {
                                  return <div className="btn-outline-success w-100 mr-5 mt-3"> <a onClick={()=> self.forwardpath(projectObj.email, projectObj.projecttitle)}> Bid Now </a></div>
                          })}</td>
                  </tr>
                </tbody>
            </table>
            <hr className="my-4"/>
        </div>
        <div className="float-left w-50 col-lg-1"></div>
          <div className="float-left w-50 position-relative col-lg-7">
              <div className="w-50 mr-5">
                  <h1 className="lead mt-2 pt-2">
                    <p className="display-4">Your Bids</p>
                  </h1>
              </div>
              <table className="w-50">
                <tbody>
                      <tr>
                            <td><div className="bg-warning w-100 mr-5"> Project Title </div></td>
                            <td><div className="bg-warning w-100 mr-5"> Employer </div></td>
                            <td><div className="bg-warning w-100 mr-5"> Bid amount </div></td>
                            <td><div className="bg-warning w-100 mr-5"> Bid Days </div></td>
                            <td><div className="bg-warning w-100 mr-5"> Avg Bid </div></td>
                            <td><div className="bg-warning w-100 mr-5"> total Bid </div></td>
                      </tr>
                      <tr>
                      <td>{this.state.bidprojects.map(function(project, index){
                          return <div className="bg-secondary w-100 mr-5 mt-3">{project.projecttitle}</div>
                        })}</td>
                        <td>{this.state.bidprojects.map(function(project, index){
                            return <div className="bg-secondary w-100 mr-5 mt-3">{project.employer}</div>
                          })}</td>
                          <td>{this.state.bidprojects.map(function(project, index){
                              return <div className="bg-secondary w-100 mr-5 mt-3">{project.bidamount}</div>
                            })}</td>
                        <td>{this.state.bidprojects.map(function(project, index){
                            return <div className="bg-secondary w-100 mr-5 mt-3">{project.biddays}</div>
                          })}</td>

                          <td>{this.state.bidprojects.map(function(project, index){
                              return <div className="bg-secondary w-100 mr-5 mt-3">{project.avgbid}</div>
                            })}</td>

                            <td>{this.state.bidprojects.map(function(project, index){
                                return <div className="bg-secondary w-100 mr-5 mt-3">{project.totalbid}</div>
                              })}</td>
                  </tr>
                </tbody>
            </table>
            <hr className="my-4"/>

        </div>
        </div>

          </div>
        )} />

      </div>
    )
  }
}

export default withRouter(Dashboardwork);
