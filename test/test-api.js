var assert = require('assert');
var router = require('../routes/login');
var request = require('supertest');
var assert = require('chai').assert;

//Test case- 1 - login
it('Test case 1 - should respond with success flag on', function(done) {
	  request(router)
      .post('/login')
      .send({"email":"ddd@gmail.com",
    	  "password":"Ddd#12345"})
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
            if (err) done(err);
            token=res.body.token;
            assert.equal(res.body.success, true);
            done();
      });
 });
