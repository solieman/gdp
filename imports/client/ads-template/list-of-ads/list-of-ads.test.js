const assert = require('assert');

it('should complete this test', function (done) {
  return new Promise(function (resolve) {
    assert.ok(true);
    resolve();
  })
    .then(done);
});


describe('Ads', function() {
  describe('#ads()', function() {
    it('should return array without error', function(done) {
      var user = new Ads();
      user.ads();
    });
  });
});

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});