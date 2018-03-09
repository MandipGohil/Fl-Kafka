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


router.post('/getDataUserprofile', (req, res, next) => {

  console.log("getDataUserprofile Function");
  let container = {
		payload: req.body
  };//container

  userServices.getprofile(container.payload, function(status,data) {
      //console.log(`status : - ${status}`);
      if(status) {
        console.log(data);
        var response = {
              "msg":"User Data Updated",
              status: 201
          } //response made
          res.json(data);
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

module.exports = router;
