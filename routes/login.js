var express = require('express');
var router = express.Router();

var userServices = require('./services/userServices');

router.post('/loginFunction', function(req, res, next) {

      console.log("Login Function");
      let container = {
    		payload: req.body
      };//container

      if(container.payload.email === "" ||
            container.payload.password === "") {

          var response = {
                "msg":"Please Enter Username or Password!!",
                status: 401
            }
          res.json(response);
      } else {
        userServices.userLogin(req, container.payload, (status) => {
          if(!status) {
            var response = {
                  "msg":"Incorrect Username or Password",
                  status: 401
              } //response made
              res.json(response);
          } else {

            var response = {
                  "msg":"You are Login Successfully..",
                  status: 201
              } //response made
              res.json(response);
          }
        });
      }
});
module.exports = router;
