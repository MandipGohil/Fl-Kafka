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
userLogin: function(container, callback) {
  console.log(`You are in newLogin Function`);
  var sqlQuery = "SELECT * FROM users WHERE email="+"'"+container.email+"';";
  mysql.runQuery( (err, rows) => {
    if(rows.length > 0) {
      if(container.password === rows[0].password) {
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
                                          "`skills`="+"'"+container.skills + "'"+
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

// Get user Profile data
getprofile: function(container, callback) {
        console.log(`You are in getprofile Function`);
                    var sqlQuery = "SELECT * FROM userDetails WHERE email="+"'"+container.email+"';";
  mysql.runQuery( (err, rows) => {
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
}

}
