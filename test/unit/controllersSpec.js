'use strict';

/* Dummy test */
describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });
});

/* Routing tests */
describe('Coach routing', function() {

  beforeEach(angular.mock.module('coachApp'));

  /* var request = require('request');
  var base_url = "http://localhost:5000/";

  it("site.html", function(done) {
    request.get(base_url + "site.html", function(error, response, body) {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  it("listings.html", function(done) {
    request.get(base_url + "listings.html", function(error, response, body) {
      expect(response.statusCode).toBe(200);
      done();
    });
  }); */
});
