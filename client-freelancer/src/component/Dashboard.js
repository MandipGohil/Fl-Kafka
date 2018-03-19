import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import * as API from '../api/API';


class Dashboard extends Component {

  state = {
    email: '',
    role: '',
    projects: [],
    status: "true",
    tmp: [ "Ford", "BMW", "Fiat" ],
    projectsthatbidbyfreelancer: []
  }

  componentWillMount(){
    console.log("Willmount Dashboard");
    //console.log(this.state);
    //console.log(this.props.location.state.role);
      API.checklogin()
        .then((response) => {
          //console.log(response);
          if(response.status === 201) {
                console.log("Its ok");
                this.setState({
                  email: response.email,
                  role: response.role
                });
                console.log(`Dashboard: email --> ${this.state.email} ** role --> ${this.state.role}`);
              /*  API.getProjects(this.state)
                          .then((response) => {
                              //alert("got this"+response.projects[0].email);
                              //console.log(response);
                              this.setState({
                                projects:response.projects
                              });
                              console.log(`one ---> ${this.state.projects[0].email}`);
                          });*/
                        if(this.props.location.state.role === "hire") {
                          API.getProjects(this.state)
                                    .then((response) => {
                                        //alert("got this"+response.projects[0].email);
                                        //console.log(response);
                                        this.setState({
                                          projects:response.projects
                                        });
                                        //console.log(`one ---> ${this.state.projects[0]}`);
                                    });

                                    API.getProjectsthatbidbyfreelancer(this.state)
                                              .then((response) => {
                                                    console.log("Response getProjectsthatbidbyfreelancer" + response);
                                                  this.setState({
                                                    projectsthatbidbyfreelancer:response.getProjectsthatbidbyfreelancer
                                                  });
                                                //  console.log(`one ---> ${this.state.projectsthatbidbyfreelancer[0]}`);
                                              });


                        } else {
                          this.props.history.push({
                            pathname: '/dashboardwork',
                            state: {
                              email: this.state.email,
                              role: this.state.role
                            }
                          });
                        }
          } else {
            console.log("Its not ok forward to login page");
            this.props.history.push('/login');
          }
        });
    }
    //Hirefreelancer function
    hirefreelancer = (freelancer,employer, projecttitle) => {
      console.log("You are in hirefreelancer Function");
    //  console.log(`Hire this --> ${data}`);
      var payload = {
        freelancer: freelancer,
        employer: employer,
        projecttitle: projecttitle
      }
      //this.props.history.push('/');
      /*this.props.history.push({
        pathname: '/dashboard',
        state: {
          email: this.state.email,
          role: this.state.role
        }
      });*/
          API.hirefreelancer(payload)
          .then((response) => {
            console.log(response);
            alert(`Freelance Hire`);
                if (response.status === 201) {
                    this.setState({
                        message: response.msg
                    });
                    this.props.history.push({
                      pathname: '/userprofile',
                      state: {
                        email: this.state.email,
                        role: this.state.role
                      }
                  });
                } else if (response.status === 401) {
                    this.setState({
                        message: response.msg
                    });
                    console.log(this.state);

                }
          });
    }

    //projectdetails
    projectdetails = (email, projectname) => {
      console.log("Project Details Function");
      console.log(email +"---"+ projectname);
      this.props.history.push({
        pathname: '/projectdetails',
        state: {
          email: this.state.email,
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
    //console.log("self -->" + self);
    return (
      <div className="container-fluid">
      <Route exact path="/dashboard" render={() => (
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
                    pathname: '/dashboard',
                    state: {
                      email: this.state.email
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
                pathname: '/postproject',
                state: {
                  email: this.state.email
                }
              });
            }}>
              Project Post
            </button>

            <button className="btn btn-outline-success my-2 my-sm-3 mx-sm-2" type="button"
            onClick={() => {
              console.log("ON Click Profile Button");
              this.props.history.push({
                pathname: '/userprofile',
                state: {
                  email: this.state.email
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

          <div className="float-left w-50 h-50">
              <div className="w-50 mr-5">
                  <h1 className="lead mt-2 pt-2">
                    <p className="display-4">Projects List</p>
                  </h1>
              </div>
              <table className="w-50">
                <tbody>
                      <tr>
                            <td><div className="bg-info w-100 mr-5"> Project Title </div></td>
                            <td><div className="bg-info w-100 mr-5"> Min Budget </div></td>
                            <td><div className="bg-info w-100 mr-5"> Max Budget </div></td>
                            <td><div className="bg-info w-100 mr-5"> Status </div></td>
                            <td><div className="bg-info w-100 mr-5"> Freelance </div></td>
                      </tr>
                      <tr>
                      <td>{this.state.projects.map(function(projectObj, index){
                          //return <div className="btn-outline-success w-100 mr-5 mt-3"><a onClick={()=> self.hirefreelancer(projectObj.freelancer, self.state.email,projectObj.projecttitle)}> Hire!! </a></div>
                          return <div className="btn-secondary w-100 mr-5 mt-3"><a onClick={()=> self.projectdetails(self.state.email,projectObj.projecttitle)}>{projectObj.projecttitle}</a></div>
                        })}</td>
                            <td>{this.state.projects.map(function(projectObj, index){
                                return <div className="bg-secondary w-100 mr-5 mt-3">{projectObj.minbudget}</div>
                              })}</td>
                              <td>{this.state.projects.map(function(projectObj, index){
                                  return <div className="bg-secondary w-100 mr-5 mt-3">{projectObj.maxbudget}</div>
                                })}</td>
                            <td>{this.state.projects.map(function(projectObj, index){
                                      //return <div type="button" className="bg-white w-100 mr-5 mt-3" onClick={() => alert("click bid")}>Bid </div>
                                      return <div className="btn-outline-info w-100 mr-5 mt-3">{projectObj.status}</div>

                                      //return <button type="button" className="btn-info mr-5 mt-3" onClick={() => alert("click bid")}>Bid</button>
                              })}</td>
                              <td>{this.state.projects.map(function(projectObj, index){
                                  return <div className="bg-secondary w-100 mr-5 mt-3">{projectObj.freelancer}</div>
                                })}</td>
                  </tr>
                </tbody>
            </table>
            <hr className="my-4"/>

        </div>
          <div className="float-right w-50">
              <div className="w-50 mr-5">
                  <h1 className="lead mt-2 pt-2">
                    <p className="display-4">Projects Bids</p>
                  </h1>
              </div>
              <table className="w-50">
                <tbody>
                      <tr>
                            <td><div className="bg-info w-100 mr-5"> Project Title </div></td>
                            <td><div className="bg-info w-100 mr-5"> Freelancer </div></td>
                            <td><div className="bg-info w-100 mr-5"> Bid amount </div></td>
                            <td><div className="bg-info w-100 mr-5"> Bid Days </div></td>
                            <td><div className="bg-info w-100 mr-5"> AVG Bid </div></td>
                            <td><div className="bg-info w-100 mr-5"> Hire </div></td>
                      </tr>
                      <tr>

                      <td>{this.state.projectsthatbidbyfreelancer.map(function(projectObj, index){
                          return <div className="bg-secondary w-100 mr-5 mt-3">{projectObj.projecttitle}</div>
                        })}</td>

                      <td>{this.state.projectsthatbidbyfreelancer.map(function(projectObj, index){
                          return <div className="bg-secondary w-100 mr-5 mt-3">{projectObj.freelancer}</div>
                        })}</td>

                        <td>{this.state.projectsthatbidbyfreelancer.map(function(projectObj, index){
                            return <div className="bg-secondary w-100 mr-5 mt-3">{projectObj.bidamount}</div>
                          })}</td>

                          <td>{this.state.projectsthatbidbyfreelancer.map(function(projectObj, index){
                              return <div className="bg-secondary w-100 mr-5 mt-3">{projectObj.biddays}</div>
                            })}</td>

                            <td>{this.state.projectsthatbidbyfreelancer.map(function(projectObj, index){
                                return <div className="bg-secondary w-100 mr-5 mt-3">{projectObj.avgbid}</div>
                              })}</td>

                            <td>{this.state.projectsthatbidbyfreelancer.map(function(projectObj, index){
                                      //return <div type="button" className="bg-white w-100 mr-5 mt-3" onClick={() => alert("click bid")}>Bid </div>
                                      return <div className="btn-outline-success w-100 mr-5 mt-3"><a onClick={()=> self.hirefreelancer(projectObj.freelancer, self.state.email,projectObj.projecttitle)}> Hire!! </a></div>

                                      //return <button type="button" className="btn-info mr-5 mt-3" onClick={() => alert("click bid")}>Bid</button>
                              })}</td>

                  </tr>
                </tbody>
            </table>
            <hr className="my-4"/>
        </div>
          </div>
        )} />

      </div>
    )
  }
}

export default withRouter(Dashboard);
