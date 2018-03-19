import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import * as API from '../api/API';

class Postproject extends Component {

  state = {
    email: '',
    role: '',
    message: '',
    emailp: '',
    projectname: '',
    projecttitle: '',
    description: '',
    skillsreq: '',
    minbudget: '',
    maxbudget: '',
    bidamount: '',
    biddays:'',
    status: ''
  }
  componentWillMount(){
    console.log("Willmount getbidprojectdetails");
    //console.log(this.state);
    //alert("you are in bid project");
    this.setState({
      //emailp: 'ddd@gmail.com',
    //  projectname: 'Project 4'
      emailp: this.props.location.state.email,
      projectname: this.props.location.state.projectname
    });

      API.checklogin()
        .then((response) => {
          console.log(response);
          if(response.status === 201) {
            console.log("Session ok");
            this.setState({
              email: response.email,
              role: response.role
            });

            API.getbidprojectdetails(this.state)
              .then((response) => {
                console.log(response);
                this.setState({
                  projecttitle: response.projecttitle,
                  description: response.description,
                  skillsreq: response.skillsreq,
                  minbudget: response.minbudget,
                  maxbudget: response.maxbudget
                });
              });
          } else {
            console.log("Session not ok");
            this.props.history.push('/login');
          }
        });
  }

  //Bid on projects
  bidproject = (biddata) => {
  //  alert("You are in bid project function");
    console.log("Bid data -->"+ biddata);
    API.bidproject(biddata)
      .then((response) => {
        //alert("response bidproject :== " + response.msg);
      this.props.history.push('/dashboardwork');
      });
  }
  //Logout Function
  logout = () => {
    console.log("Log out function");
    API.logout()
    .then((response) => {
      if(response.status === 201) {
        //this.props.history.push('/');
      } else if (response.status === 401) {
          this.setState({
              message: response.msg
          });
      }
    });
    console.log("Back to Logout Function");
  };

  render() {
    return (
      <div className="conta/iner-fluid w-50 h-50 mx-auto">
        <Route exact path="/bidonproject" render={() => (
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
                        console.log("ON Click Dashboard Button");
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

          <div className="mt-8 h-100 w-100">

              <p className="lead mt-2 pt-2">
                <h1 className="display-4">Project Details</h1>
              </p>

            <hr className="my-4"/>

            <div className="form-group ">
              <input type="text" className="form-control" placeholder="Project Title" id="projecttitle" name="projecttitle"
              value={this.state.projecttitle}
                />
            </div>

            <div className="input-group">
              <textarea className="form-control" placeholder="Project Description" aria-label="With textarea"
              id="description" name="description"
              value={this.state.description}
                >
              </textarea>
            </div>

            <div className="input-group mt-3">
              <textarea className="form-control" placeholder="Skills Require" aria-label="With textarea"
              id="skillsreq" name="skillsreq"
              value={this.state.skillsreq}
                >
              </textarea>
            </div>

            <div className="form-group mt-3">
              <input type="text" className="form-control" placeholder="Minimum Budget" id="minbudget" name="minbudget"
              value={this.state.minbudget}
                />
            </div>

            <div className="form-group ">
              <input type="text" className="form-control" placeholder="Maximum  Budget" id="maxbudget" name="maxbudget"
              value={this.state.maxbudget}
                />
            </div>

            <div className="form-group ">
              <input type="text" className="form-control" placeholder="Your Bid" id="bidamount" name="bidamount"
              value={this.state.bidamount}
              onChange={(event) => {
                  this.setState({
                      bidamount: event.target.value
                  });
              }}/>
            </div>

            <div className="form-group ">
              <input type="text" className="form-control" placeholder="Days you need to complate" id="biddays" name="biddays"
              value={this.state.biddays}
              onChange={(event) => {
                  this.setState({
                      biddays: event.target.value
                  });
              }}/>
            </div>

            <p className="lead mt-2 pt-2">
            <button type="button" className="my-2 mx-sm-2 btn-info"
                onClick={() => this.bidproject(this.state)} >
              Done
            </button>
            <button type="button" className="my-2 mx-sm-2 btn-info"
                onClick={() => this.props.history.push({
                  pathname: '/dashboardwork',
                  state: {
                    email: this.state.email,
                    role: this.state.role
                  }
                })} >
            Back
            </button>
            </p>

            <div>
                <button type="button" className="btn-danger">
                    {this.state.message}
                </button>
            </div>
        </div>
          </div>
        )} />
      </div>
    )
  }

}

export default withRouter(Postproject);
