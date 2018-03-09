import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import * as API from '../api/API';

class Userprofile extends Component {

  state = {
    email: this.props.location.state.email,
    name: '',
    phonenumber: '',
    aboutme: '',
    skills: '',
    message: '',
    photo: ''
  }

  componentWillMount(){
    console.log("Willmount user profile");
    //console.log(this.state);
      API.getDataUserprofile(this.state)
        .then((response) => {
          console.log(response);
          this.setState({
            email: response.email,
            name: response.name,
            phonenumber: response.phonenumber,
            aboutme: response.aboutme,
            skills: response.skills,
            message: response.message,
            photo: response.photo
          });
        });
  }

  // After Click on Update this function call
      updateUserdata = (userdata) => {
        console.log(userdata);
          API.updateUserdata(userdata)
          .then((response) => {
            console.log(response);
                if (response.status === 201) {
                    this.setState({
                        message: response.msg
                    });
                    this.props.history.push({
                      pathname: '/dashboard',
                      state: {
                        email: this.state.email
                      }
                    });
                } else if (response.status === 401) {
                    this.setState({
                        message: response.msg
                    });
                    console.log(this.state);
                }
          });
          console.log("Back to login Function");
      };

  render() {
    return (
      <div className="container-fluid w-50 h-50 mx-auto ">
        <Route exact path="/userprofile" render={() => (
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

          <div className="">
            <div className="pic-container pic-medium pic-circle mx-auto">
              <img className="pic" src="http://www.chillicothe.com/images/profile_icon.jpg" alt=""/>
              <div className="pic-overlay">
                  <a><i className="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                  <input type="file" id="photo" name="photo" placeholder="up"
                  value={this.state.photo}
                    onChange={(event) => {
                        this.setState({
                            photo: event.target.value
                        });
                    }}/>
              </div>
            </div>

            <h1 className="display-4">{this.props.location.state.email}</h1>
            <hr className="my-4"/>
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
              <input type="text" className="form-control" placeholder="Phone Number" id="phonenumber" name="phonenumber"
              value={this.state.phonenumber}
                onChange={(event) => {
                    this.setState({
                        phonenumber: event.target.value
                    });
                }}/>
                <i className="fa fa-user"></i>
            </div>
            <div className="input-group">
              <textarea className="form-control" placeholder="About Me" aria-label="With textarea"
              id="aboutme" name="aboutme"
              value={this.state.aboutme}
                onChange={(event) => {
                    this.setState({
                        aboutme: event.target.value
                    });
                }}>
              </textarea>
              <i className="fa fa-user"></i>
            </div>

            <div className="input-group mt-3">
              <textarea className="form-control" placeholder="Skills" aria-label="With textarea"
              id="skills" name="skills"
              value={this.state.skills}
                onChange={(event) => {
                    this.setState({
                        skills: event.target.value
                    });
                }}>
              </textarea>
              <i className="fa fa-user"></i>
            </div>

            <p className="lead mt-2 pt-2">
            <button type="button" className="my-2 mx-sm-2 btn-info"
            onClick={() => this.updateUserdata(this.state)}
              >
              Update
            </button>
            <button type="button" className="my-2 mx-sm-2 btn-info"
            onClick={() => {
              console.log("Skip Click");
              this.props.history.push({
                pathname: '/dashboard',
                state: {
                  email: this.state.email
                }
              });
            }}>
              Skip
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

export default withRouter(Userprofile);
