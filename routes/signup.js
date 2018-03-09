var express = require('express');
var router = express.Router();

var userServices = require('./services/userServices');

router.post('/signupFunction', function(req, res, next) {

  console.log("Signup Function");
  let container = {
		payload: req.body
  };//container
  console.log(container.payload);
  if(container.payload.username === "" ||
        container.payload.email === "" ||
        container.payload.password === "" ||
        container.payload.conpassword === "") {

      var response = {
            "msg":"Please Fill all the Details",
            status: 401
        }
      res.json(response);
  } //if any field empty
  else {
    if(container.payload.password === container.payload.conpassword) {
      userServices.checkEmail(container.payload.email, function(status){
        if(!status) {
          var response = {
                "msg":"Email Id is not Correct",
                status: 401
            }//response made
          res.json(response);
          console.log("back to function");
        } //satus checkemail
        else {
          userServices.checkPassword(container.payload.password,function(status){
              if(!status) {
                var response = {
                      "msg":"Your Password is too weak. Password must contain one uppercase, lowercase, number, special char and length=8 minimum",
                      status: 401
                  }//response made
                res.json(response);
                console.log("back to function");
              } //satus checkpassword
              else {
                userServices.checkUser(container.payload, function(status){
                  if(status) {
                    var response = {
                          "msg":"User Email is already register",
                          status: 401
                      } //response made
                    res.json(response);
                  } //status checkUser
                  else {
                    userServices.addUser(container.payload, function(status) {
                      if(!status) {
                        var response = {
                              "msg":"Error in Insert",
                              status: 401
                          } //response made
                          res.json(response);
                      }
                    });
                    userServices.newUser(container.payload, function(status) {
                        console.log(`status : - ${status}`);
                        if(status) {
                          var response = {
                                "msg":"User Created",
                                status: 201
                            } //response made
                            res.json(response);
                        } //status newUser
                        else {
                          var response = {
                                "msg":"User Not Created",
                                status: 401
                            }//response made
                            res.json(response);
                        }
                    }); //newUser Function end

                  }
                }); //checkUser function end
              }
            }); // checkPassword function end
        }
      });
    }
    else {
      var response = {
            "msg":"Your Password and Confirm Password did not match",
            status: 401
        }
      res.json(response);
    }
  }

}); // /signupFunction route end
module.exports = router;
