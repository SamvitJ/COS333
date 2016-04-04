'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Coach App', function() {

  describe('Project site', function() {

    beforeEach(function() {
      browser.ignoreSynchronization = true; // used to test non-angular code
      browser.get('client/views/html/site.html');
    });

    it('should display project site', function() {

    });
  });
});
