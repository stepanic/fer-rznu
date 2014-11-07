// Config to access to Sails.js API via REST interface
var API = require('./sailsTestsPreconfig.js');
var _ = require('lodash');

//Jasmine TESTS
describe('Sails Todo Model Test CRUD', function() {
    // Should not reorder of tests because the order of executing is important !!!

    // Config data which will be send to API, and which will be asserted
    var data = {
      id:       null, // ID of Model instance, to test FIND, UPDATE and DELETE
      text:     "test to create todo task čćšđžČĆŠĐgdfgdfgdfĐŽ !@#$$%$#%^$%^",
      duration: 78
    };

    // Headers
    var headers = {}

    beforeEach(function() {
      // Setup headers
      headers['username']  = 'demo';
      headers['password']  = 'demo1234';
    });

    it('1 . Should Create a Todo instance', function() {
        /**
         * Request config, can be directly send to protractor.promise, but much nicer to isolate
         * @method request
         * @return CallExpression
         */
        function request() {
          return API.post('/todo', {
              form : {
                  text      : data.text,
                  duration  : data.duration
              },
              headers: headers
          })
        }
        // All HTTP request are ASYNC, with protractor.promise all requests are SYNC (linear in time)
        var flow = protractor.promise.controlFlow();
        flow.execute(request).then(function(response) {
          // Parse body, because returned as JSON
          var result = response.message.toJSON();
          var body = API.parse(result.body);
          console.log.verbose("Response body:", body);
          // Asserts
          expect(result.statusCode).toEqual(200);
          expect(body.text).toEqual(data.text);
          expect(body.duration).toEqual(data.duration);
          expect(body.createdAt).toBeDefined();
          expect(body.updatedAt).toBeDefined();
          expect(body.id).toBeDefined();
          // Save id for other tests
          data.id = body.id;
        });
    });

    it('1a. Should Create a Todo instance - one more copy', function() {
        /**
         * Request config, can be directly send to protractor.promise, but much nicer to isolate
         * @method request
         * @return CallExpression
         */
        function request() {
          return API.post('/todo', {
              form : {
                  text      : "RZNU 1. labos",
                  duration  : 10,
                  description : "Napraviti labos prema uputama sa FER.hr!"
              },
              headers: headers
          })
        }
        // All HTTP request are ASYNC, with protractor.promise all requests are SYNC (linear in time)
        var flow = protractor.promise.controlFlow();
        flow.execute(request).then(function(response) {
          // Parse body, because returned as JSON
          var result = response.message.toJSON();
          var body = API.parse(result.body);
          console.log.verbose("Response body:", body);
          // Asserts
          expect(result.statusCode).toEqual(200);
          expect(body.text).toEqual("RZNU 1. labos");
          expect(body.duration).toEqual(10);
          expect(body.description).toEqual("Napraviti labos prema uputama sa FER.hr!");
          expect(body.createdAt).toBeDefined();
          expect(body.updatedAt).toBeDefined();
          expect(body.id).toBeDefined();
        });
    });

    it('2. Should FindOne a Todo instance', function() {
        function request() {
          return API.get('/todo/' + data.id, {
            headers: headers
          })
        }
        var flow = protractor.promise.controlFlow();
        flow.execute(request).then(function(response) {
          var result = response.message.toJSON();
          console.log.verbose("Result: ", result);
          var body = API.parse(result.body);
          // Asserts
          expect(result.statusCode).toEqual(200);
          expect(body.text).toEqual(data.text);
          expect(body.duration).toEqual(data.duration);
          expect(body.createdAt).toBeDefined();
          expect(body.updatedAt).toBeDefined();
          expect(body.id).toEqual(data.id);
        });
    });

    it('3. Should Update a Todo instance', function() {
        // Change data of instance
        data.text = "iymijenjeno ;'][:|}{^*&%&$$#@%$";
        data.duration = 78678;

        function request() {
          return API.put('/todo/' + data.id, {
              form : {
                  text      : data.text,
                  duration  : data.duration
              },
              headers: headers
          })
        }
        var flow = protractor.promise.controlFlow();
        flow.execute(request).then(function(response) {
          var result = response.message.toJSON();
          var body = API.parse(result.body);
          // Asserts
          expect(result.statusCode).toEqual(200);
          expect(body.text).toEqual(data.text);
          expect(body.duration).toEqual(data.duration);
          expect(body.createdAt).toBeDefined();
          expect(body.updatedAt).toBeDefined();
          expect(body.id).toEqual(data.id);
        });
    });

    xit('4. Should Destroy a Todo instance', function() {
        function request() {
          return API.del('/todo/' + data.id, {
            headers: headers
          })
        }
        var flow = protractor.promise.controlFlow();
        // First request should delete and return instance object
        flow.execute(request).then(function(response) {
          var result = response.message.toJSON();
          console.log.verbose(result.body);
          var body = API.parse(result.body);
          // Asserts
          expect(result.statusCode).toEqual(200);
          expect(body.text).toEqual(data.text);
          expect(body.duration).toEqual(data.duration);
          expect(body.createdAt).toBeDefined();
          expect(body.updatedAt).toBeDefined();
          expect(body.id).toEqual(data.id);
        });
        // Second request should return error 404
        flow.execute(request).then(function(response) {
          var result = response.message.toJSON();
          // Asserts
          expect(result.statusCode).toEqual(404);
          expect(result.body).toEqual("Not Found");
        });
    });

    it('5. Should Get all Todo instances by Demo user', function() {
      function findDemoUser() {
        return API.get('/user?where={ { "username": "demo" } }', {
          headers : {
            token: "gFNNkdQ5WrysBcujHKMJY8Ewy8XNsAcY"
          }
        })
      }
      var flow = protractor.promise.controlFlow();
      flow.execute(findDemoUser).then(function(response) {
        var userDemo = API.parse(response.message.toJSON().body)[0];

        flow.execute(function() {
          return API.get('/user/' + userDemo.id + '/todos', {
            headers : {
              username: "demo",
              password: "demo1234"
            }
          })
        }).then(function(response) {
          var result = response.message.toJSON();
          console.log.verbose(result.body);
          var body = API.parse(result.body);

          _.each(body, function(item) {
            expect(item.text).toBeDefined();
            expect(item.duration).toBeDefined();
            expect(item.description).toBeDefined();
            expect(item.createdAt).toBeDefined();
            expect(item.updatedAt).toBeDefined();
            expect(item.id).toBeDefined();
            expect(item.author).toEqual(userDemo.id);
          });
        });
      });


    });
});
