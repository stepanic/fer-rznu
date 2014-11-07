var API = require('./sailsTestsPreconfig.js');
var _ = require('lodash');

function prepare() {
  // Remove demo and test users if exists
  // Find
  function find() {
    return API.get('/user?where={ "or": [ { "username": "demo" }, { "username": "test" } ] }', {
      headers : {
        token: "gFNNkdQ5WrysBcujHKMJY8Ewy8XNsAcY"
      }
    })
  }
  // Execute flow, find and then destroy
  var flow = protractor.promise.controlFlow();
  flow.execute(find).then(function(response) {
    var result = response.message.toJSON();
    var body = API.parse(result.body);
    console.log.verbose("Body", body);
    if (body && body.length > 0) {
      _.forEach(body, function(item) {
        console.log.verbose(item);
        // Destroy
        flow.execute(function() {
          return API.del('/user/' + item.id, {
            headers : {
              token: "gFNNkdQ5WrysBcujHKMJY8Ewy8XNsAcY"
            }
          });
        });
      });
    }
  });
}


describe('Sails User Model', function() {

    // Must be runned before all tests
    prepare();

    beforeEach(function() {

    });

    it('1. Should Create DEMO User', function() {
        function request() {
          return API.post('/user', {
              form : {
                  username: "demo",
                  password: "demo1234"
              }
          })
        }
        var flow = protractor.promise.controlFlow();
        flow.execute(request).then(function(response) {
          var result = response.message.toJSON();
          var body = API.parse(result.body);

          expect(result.statusCode).toEqual(200);
          expect(body.username).toEqual("demo");
          expect(body.password).toBeUndefined();
          expect(body.createdAt).toBeDefined();
          expect(body.updatedAt).toBeDefined();
          expect(body.id).toBeDefined();
        });
    });

    it('1a. Should Create TEST User', function() {
        function request() {
          return API.post('/user', {
              form : {
                  username: "test",
                  password: "test1234"
              }
          })
        }
        var flow = protractor.promise.controlFlow();
        flow.execute(request).then(function(response) {
          var result = response.message.toJSON();
          var body = API.parse(result.body);

          expect(result.statusCode).toEqual(200);
          expect(body.username).toEqual("test");
          expect(body.password).toBeUndefined();
          expect(body.createdAt).toBeDefined();
          expect(body.updatedAt).toBeDefined();
          expect(body.id).toBeDefined();
        });
    });

    it('2. Should return validation error when Create DEMO User again', function() {
        function request() {
          return API.post('/user', {
              form : {
                  username: "demo",
                  password: "demo1234"
              }
          })
        }
        var flow = protractor.promise.controlFlow();
        flow.execute(request).then(function(response) {
          var result = response.message.toJSON();
          var body = API.parse(result.body);
          console.log.verbose(body);
          expect(result.statusCode).toEqual(400);
          expect(body.error).toEqual("E_VALIDATION");
          expect(body.invalidAttributes.username).toBeDefined();
        });
    });

});
