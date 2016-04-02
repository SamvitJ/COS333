'use strict';

/* jasmine specs for controllers go here */
describe('Coach routing', function() {

  var request = require('request');

  beforeEach(module('coachApp'));

  it("test site.html routing", function(done) {
    request("http://localhost:8000/site.html", function(error, response, body) {
      done();
    });
  });

});
