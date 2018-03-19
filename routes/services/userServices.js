//Write the function ofr login and signup that do interaction with database
var mysql = require('../mysql');
let password_pattern = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=?!~|()<>{}:;,"'`\[\]\\\/.\-_*])([a-zA-Z0-9@#$%^&+=?!~|()<>{}:;,“’`\[\]\\\/*.\-_]){8,}$/;
let email_pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
module.exports = {

//Check the stregth of the password
checkPassword:function(password, callback) {
  console.log(`You are in checkPassword function`);
        if (!password_pattern.test(password)) {
          callback(false);
        }
        else {
          callback(true);
        }
},
//Check valid Email ID
checkEmail:function(email, callback) {
  console.log(`You are in checkEmail function`);
        if (!email_pattern.test(email)) {
          callback(false);
        }
        else {
          callback(true);
        }
},
//check for exixsting user
checkUser: function(container, callback) {
    console.log(`You are in checkUser Function`);
    var sqlQuery = "SELECT * FROM users WHERE email="+"'"+container.email+"';";
    mysql.runQuery( (err, rows) => {
      console.log("inside if");
      if(rows.length > 0) {
        callback(true);
      } else {
        callback(false);
      }
    },sqlQuery);

},
//userLogin Function
userLogin: function(req, container, callback) {
  console.log(`You are in newLogin Function`);
  var sqlQuery = "SELECT * FROM users WHERE email="+"'"+container.email+"';";
  mysql.runQuery( (err, rows) => {
    if(rows.length > 0) {
      
      if(container.password === rows[0].password) {
        req.session.username = container.email;
        req.session.role = rows[0].role;
        console.log(`Login track -> ${req.session.username} Login track -> ${req.session.role}`);
        callback(true);
      } else {
        callback(false);
      }
    } else {
      callback(false);
    }
  },sqlQuery);
},
//Create a new user
newUser: function(container, callback) {
        console.log(`You are in newUser Function`);
                    var sqlQuery = "INSERT INTO users"+
                                          "(`username`,"+
                                          "`email`,"+
                                          "`password`,"+
                                          "`role`)"+
                                          "VALUES" +
                                          "('"+container.name + "'," +
                                              "'" +container.email + "'," +
                                              "'" +container.password + "',"+
                                              "'" +container.role + "');";
  mysql.runQuery( (err, rows) => {
    console.log(err);
    if(err != null) {
      console.log("inside the if");
      callback(false);
    }
    else {
      console.log("true");
      callback(true);
    }
  },sqlQuery);
},

//Create a new user
addUser: function(container, callback) {
        console.log(`You are in newUser Function`);
                    var sqlQuery = "INSERT INTO userDetails"+
                                          "(`email`,"+
                                          "`name`)"+
                                          "VALUES" +
                                          "('"+container.email + "'," +
                                              "'" +container.name + "');";
  mysql.runQuery( (err, rows) => {
    console.log(err);
    if(err != null) {
      //console.log("inside the if");
      callback(false);
    }
    else {
      console.log("true");
      callback(true);
    }
  },sqlQuery);
},

// Upadte the Details of Login User
updateUserdata: function(container, callback) {
        console.log(`You are in updateUserdetails Function`);
                    var sqlQuery = "UPDATE userDetails SET"+
                                          "`phonenumber`="+"'"+container.phonenumber + "',"+
                                          "`aboutme`="+"'"+container.aboutme + "',"+
                                          "`skills`="+"'"+container.skills + "',"+
                                          "`photo`="+"'"+container.photo + "'"+
                                          "WHERE `email` ="+ "'"+container.email+"';";
  mysql.runQuery( (err, rows) => {
    //console.log(err);
    if(err != null) {
      //console.log("inside the if");
      callback(false);
    }
    else {
      //console.log("true");
      callback(true);
    }
  },sqlQuery);
},

//logout Function
logout: function(req,callback) {

  console.log("You are in Logout function");
  req.session.destroy();
	console.log('Session destroyed --> Logout');
  callback(true);
},


//logout Function
checklogin: function(req,callback) {

  console.log("You are in Checklogin Function");
  console.log(req.session.username);
  //callback(true);
  if(req.session.username) {
    //console.log();
      callback(true);
  } else {
    console.log("Login false");
    callback(false);
  }
},

// Get user Profile data
getprofile: function(container, callback) {
        console.log(`You are in getprofile Function`);
                    var sqlQuery = "SELECT * FROM userDetails WHERE email="+"'"+container.email+"';";
  mysql.runQuery( (err, rows) => {
    //var bfphoto = new Buffer(rows[0].photo).toString('base64');
    //console.log("Photo ---" + bfphoto);
    var response = {
      email: rows[0].email,
      name: rows[0].name,
      phonenumber: rows[0].phonenumber,
      aboutme: rows[0].aboutme,
      skills: rows[0].skills,
      photo: rows[0].photo
    }
    if(err != null) {
      //console.log("inside the if");
      callback(false,null);
    }
    else {
      //console.log("true");
      callback(true,response);
    }
  },sqlQuery);
},

// Get getbidprojectdetails data
getbidprojectdetails: function(container, callback) {
        console.log(`You are in getprofile Function`);
                    var sqlQuery = "SELECT * FROM projects WHERE projecttitle="+"'"+container.projectname+"' AND email='"+container.emailp+"';";
  mysql.runQuery( (err, rows) => {
    var response = {
      projecttitle: rows[0].projecttitle,
      description: rows[0].description,
      skillsreq: rows[0].skillsreq,
      minbudget: rows[0].minbudget,
      maxbudget: rows[0].maxbudget
    }
    if(err != null) {
      //console.log("inside the if");
      callback(false,null);
    }
    else {
      //console.log("true");
      callback(true,response);
    }
  },sqlQuery);
},

// Get getprojectsthatbid data
getprojectsthatbid: function(container, callback) {
        console.log(`You are in getprofile Function`);
                    var sqlQuery = "SELECT * FROM bidproject WHERE freelancer="+"'"+container.email+"';";
  mysql.runQuery( (err, rows) => {
    var response = {
      bidprojects: rows
    }
    if(err != null) {
      //console.log("inside the if");
      callback(false,null);
    }
    else {
      //console.log("true");
      callback(true,response);
    }
  },sqlQuery);
},

// Get getProjectsthatbidbyfreelancer data
getProjectsthatbidbyfreelancer: function(container, callback) {
        console.log(`You are in getProjectsthatbidbyfreelancer Function`);
                    var sqlQuery = "SELECT * FROM bidproject WHERE employer="+"'"+container.email+"';";
  mysql.runQuery( (err, rows) => {
    var response = {
      getProjectsthatbidbyfreelancer: rows
    }
    if(err != null) {
      //console.log("inside the if");
      callback(false,null);
    }
    else {
      //console.log("true");
      callback(true,response);
    }
  },sqlQuery);
},

//Create a new user
bidproject: function(container, callback) {
        console.log(`You are in bidproject Function`);

                  var sqlQuery = "INSERT INTO bidproject"+
                                        "(`employer`,"+
                                          "`freelancer`,"+
                                          "`projecttitle`,"+
                                          "`bidamount`,"+
                                          "`biddays`)"+
                                          "VALUES" +
                                          "('"+container.emailp + "'," +
                                              "'" +container.email + "'," +
                                                "'" +container.projectname + "'," +
                                              "'" +container.bidamount + "',"+
                                              "'" +container.biddays + "');";
                                    mysql.runQuery( (err, rows) => {
                                      console.log(err);
                                      if(err != null) {
                                        //console.log("inside the if");
                                        callback(false);
                                      }
                                      else {
                                        console.log("Quary true true");
                                        var sqlQuery1 = "UPDATE projects SET"+
                                                              "`avgbid`= (SELECT AVG(bidamount) FROM bidproject WHERE projecttitle='"+container.projecttitle +"' AND employer = '"+container.emailp+"'),"+
                                                              "`totalbid`= (SELECT COUNT(projecttitle) FROM bidproject WHERE projecttitle="+"'"+container.projecttitle + "' AND employer = '"+container.emailp+"')"+
                                                              "WHERE projecttitle="+"'"+container.projecttitle+"' AND email='"+container.emailp+"';";
                                                              mysql.runQuery( (err, rows) => {
                                                                console.log(err);
                                                                if(err != null) {
                                                                  //console.log("inside the if");
                                                                  callback(false);
                                                                }
                                                                else {
                                                                  console.log("Queary 1 true");
                                                                  var sqlQuery2 = "UPDATE bidproject SET"+
                                                                                        "`avgbid`= (SELECT avgbid FROM projects WHERE projecttitle="+"'"+container.projecttitle + "' AND email = '"+container.emailp+"'),"+
                                                                                        "`totalbid`= (SELECT totalbid FROM projects WHERE projecttitle="+"'"+container.projecttitle + "' AND email = '"+container.emailp+"')"+
                                                                                        "WHERE projecttitle="+"'"+container.projecttitle+"' AND employer='"+container.emailp+"';";
                                                                                        mysql.runQuery( (err, rows) => {
                                                                                          console.log(err);
                                                                                          if(err != null) {
                                                                                            //console.log("inside the if");
                                                                                            callback(false);
                                                                                          }
                                                                                          else {
                                                                                            console.log(" Quary 2 true");
                                                                                            callback(true);
                                                                                          }
                                                                                        },sqlQuery2);
                                                                  //callback(true);
                                                                }
                                                              },sqlQuery1);
                                        //callback(true);
                                      }
                                    },sqlQuery);
},

// Get user Profile data
getProjects: function(container, callback) {
        console.log(`You are in getProjects Function`);
                    var sqlQuery = "SELECT * FROM projects WHERE email="+"'"+container.email+"';";
  mysql.runQuery( (err, rows) => {
    //console.log(`All the Project --> ${rows[0].email}`);
    //var nrows = JSON.stringify(rows);
    //console.log(`First one --> ${nrows}`);
    var response = {
      projects: rows
    }
    if(err != null) {
      //console.log("inside the if");
      callback(false,null);
    }
    else {
      //console.log("true");
      callback(true,response);
    }
  },sqlQuery);
},

// getworkProjects
getworkProjects: function(container, callback) {
        console.log(`You are in getworkProjects Function`);
                    var sqlQuery = "SELECT * FROM projects WHERE status='Open';";
  mysql.runQuery( (err, rows) => {
    //console.log(`All the Project --> ${rows[0].email}`);
    //var nrows = JSON.stringify(rows);
    //console.log(`First one --> ${nrows}`);
    var response = {
      projects: rows
    }
    if(err != null) {
      //console.log("inside the if");
      callback(false,null);
    }
    else {
      //console.log("true");
      callback(true,response);
    }
  },sqlQuery);
},

// hirefreelancer
hirefreelancer: function(container, callback) {
        console.log(`You are in hirefreelancer Function`);
                    var sqlQuery = "UPDATE projects SET"+
                                          "`freelancer`="+"'"+container.freelancer + "',"+
                                          "`status`='Close'"+
                                          "WHERE projecttitle="+"'"+container.projecttitle+"' AND email='"+container.employer+"';";

  mysql.runQuery( (err, rows) => {
    //console.log(err);
    if(err != null) {
      //console.log("inside the if");
      callback(false);
    }
    else {
      //console.log("true");
      callback(true);
    }
  },sqlQuery);
},

//Create a new user
postProject: function(container, callback) {

        console.log(`First Check Project Availbale or not`);
        var sqlQuery1 = "SELECT * FROM projects WHERE projecttitle="+"'"+container.projecttitle+"' AND email='"+container.email+"';";
        mysql.runQuery( (err, rows) => {
          if(rows.length > 0) {
            callback(false);
          } else {
            console.log(`You are in postProject Function`);
                        var sqlQuery = "INSERT INTO projects"+
                                              "(`email`,"+
                                              "`projecttitle`,"+
                                              "`description`,"+
                                              "`skillsreq`,"+
                                              "`minbudget`,"+
                                              "`maxbudget`,"+
                                              "`status`)"+
                                              "VALUES" +
                                              "('"+container.email + "'," +
                                                  "'" +container.projecttitle + "'," +
                                                  "'" +container.description + "'," +
                                                  "'" +container.skillsreq + "'," +
                                                  "'" +container.minbudget + "'," +
                                                  "'" +container.maxbudget + "',"+
                                                  "'" +container.status + "');";


                          mysql.runQuery( (err, rows) => {
                            console.log(err);
                            if(err != null) {
                              console.log("inside the if");
                              callback(false);
                            }
                            else {
                              console.log("true");
                              callback(true);
                            }
                          },sqlQuery);
          }
        },sqlQuery1);

}//postProject Function End

}
