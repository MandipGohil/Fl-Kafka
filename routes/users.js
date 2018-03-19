var express = require('express');
var router = express.Router();
var userServices = require('./services/userServices');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//updateUserdata Function
router.post('/updateUserdata', (req, res, next) => {

  console.log("updateUserdata Function");
  let container = {
		payload: req.body
  };//container
  console.log(container.payload);

  userServices.updateUserdata(container.payload, function(status) {
      //console.log(`status : - ${status}`);
      if(status) {
        var response = {
              "msg":"User Data Updated",
              status: 201
          } //response made
          res.json(response);
      } //status newUser
      else {
        var response = {
              "msg":"User Data Not Updated",
              status: 401
          }//response made
          res.json(response);
      }
  }); //updateUserdata Function end

});

//getDataUserprofile Function
router.post('/getDataUserprofile', (req, res, next) => {

  console.log("getDataUserprofile Function");
  let container = {
		payload: req.body
  };//container

  userServices.getprofile(container.payload, function(status,data) {
      //console.log(`status : - ${status}`);
      if(status) {
        console.log(data);
          res.json(data);
      } //status newUser
      else {
        var response = {
              "msg":"UserProfile Data Not Updated",
              status: 401
          }//response made
          res.json(response);
      }
  }); //getDataUserprofile Function end
});

//logout Function
router.post('/logout', (req, res, next) => {
  console.log("logout Function");

  userServices.logout(req, function(status) {
      if(status) {
        var response = {
              "msg":"User Logout",
              status: 201
          } //response made
          res.json(response);
      } //status newUser
      else {
        var response = {
              "msg":"User not Logout",
              status: 401
          }//response made
          res.json(response);
      }
  }); //logout Function end
});

//check login function
router.post('/checklogin', (req, res, next) => {
  console.log("checklogin Function");
  console.log(req.session);
  userServices.checklogin(req, function(status) {
      if(status) {
        var response = {
              "msg":"User Logged in",
              status: 201,
              email: req.session.username,
              role: req.session.role
          } //response made
          res.json(response);
      } //status newUser
      else {
        var response = {
              "msg":"User not Login",
              status: 401
          }//response made
          res.json(response);
      }
  }); //logout Function end
});

//updateUserdata Function
router.post('/postProject', (req, res, next) => {

  console.log("postProject Function");
  let container = {
		payload: req.body
  };//container
  console.log(container.payload);
  if(container.payload.projecttitle === "" ||
        container.payload.description === "" ||
        container.payload.skillsreq === "" ||
        container.payload.minbudget === "" ||
        container.payload.maxbudget === "") {

          var response = {
                "msg":"All field are require. Please Fill all the Details",
                status: 401
            }//response made
            res.json(response);

  } else {
    console.log("All field are full");
      userServices.postProject(container.payload, function(status) {
          //console.log(`status : - ${status}`);
          if(status) {
            var response = {
                  "msg":"Project Post",
                  status: 201
              } //response made
              res.json(response);
          } //status newUser
          else {
            var response = {
                  "msg":"Project Exist or Some other Error",
                  status: 401
              }//response made
              res.json(response);
          }
      }); //postProject Function end

  }

});

//getProjects Function
router.post('/getProjects', (req, res, next) => {

  console.log("getProjects Function");
  let container = {
		payload: req.body
  };//container

  userServices.getProjects(container.payload, function(status,data) {
      //console.log(`status : - ${status}`);
      if(status) {
        //console.log(`First pname ---> ${data}`);
          res.json(data);
      } //status newUser
      else {
        var response = {
              "msg":"UserProfile Data Not Updated",
              status: 401
          }//response made
          res.json(response);
      }
  }); //getProjects Function end
});

//getworkProjects Function
router.post('/getworkProjects', (req, res, next) => {

  console.log("getProjects Function");
  let container = {
		payload: req.body
  };//container

  userServices.getworkProjects(container.payload, function(status,data) {
      //console.log(`status : - ${status}`);
      if(status) {
        //console.log(`First pname ---> ${data}`);
          res.json(data);
      } //status newUser
      else {
        var response = {
              "msg":"UserProfile Data Not Updated",
              status: 401
          }//response made
          res.json(response);
      }
  }); //getworkProjects Function end
});

//getbidprojectdetails Function
router.post('/getbidprojectdetails', (req, res, next) => {

  console.log("getbidprojectdetails Function");
  let container = {
		payload: req.body
  };//container

  userServices.getbidprojectdetails(container.payload, function(status,data) {
      //console.log(`status : - ${status}`);
      if(status) {
        //console.log(`First pname ---> ${data}`);
          res.json(data);
      } //status newUser
      else {
        var response = {
              "msg":"UserProfile Data Not Updated",
              status: 401
          }//response made
          res.json(response);
      }
  }); //getbidprojectdetails Function end
});


//getprojectsthatbid Function
router.post('/getprojectsthatbid', (req, res, next) => {

  console.log("getprojectsthatbid Function");
  let container = {
		payload: req.body
  };//container

  userServices.getprojectsthatbid(container.payload, function(status,data) {
      //console.log(`status : - ${status}`);
      if(status) {
        //console.log(`First pname ---> ${data}`);
          res.json(data);
      } //status newUser
      else {
        var response = {
              "msg":"UserProfile Data Not Updated",
              status: 401
          }//response made
          res.json(response);
      }
  }); //getprojectsthatbid Function end
});

//getProjectsthatbidbyfreelancer Function
router.post('/getProjectsthatbidbyfreelancer', (req, res, next) => {

  console.log("getProjectsthatbidbyfreelancer Function");
  let container = {
		payload: req.body
  };//container

  userServices.getProjectsthatbidbyfreelancer(container.payload, function(status,data) {
      //console.log(`status : - ${status}`);
      if(status) {
        //console.log(`First pname ---> ${data}`);
          res.json(data);
      } //status newUser
      else {
        var response = {
              "msg":"UserProfile Data Not Updated",
              status: 401
          }//response made
          res.json(response);
      }
  }); //getProjectsthatbidbyfreelancer Function end
});


//bidproject Function
router.post('/bidproject', (req, res, next) => {

  console.log("bidproject Function");
  let container = {
		payload: req.body
  };//container

  userServices.bidproject(container.payload, function(status) {
      //console.log(`status : - ${status}`);
      if(status) {
        //console.log(`First pname ---> ${data}`);
        var response = {
              "msg":"bidproject Data Updated",
              status: 201
          }//response made
          res.json(response);
      } //status bidproject
      else {
        var response = {
              "msg":"bidproject Data Not Updated",
              status: 401
          }//response made
          res.json(response);
      }
  }); //bidproject Function end
});


//hirefreelancer Function
router.post('/hirefreelancer', (req, res, next) => {

  console.log("hirefreelancer Function");
  let container = {
		payload: req.body
  };//container
  console.log(container.payload);

  userServices.hirefreelancer(container.payload, function(status) {
      //console.log(`status : - ${status}`);
      if(status) {
        var response = {
              "msg":"Freelancer Hire",
              status: 201
          } //response made
          res.json(response);
      } //status newUser
      else {
        var response = {
              "msg":"Freelancer Hire",
              status: 401
          }//response made
          res.json(response);
      }
  }); //hirefreelancer Function end
});




module.exports = router;
