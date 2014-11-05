// Config to access to Sails.js API via REST interface
var API = require('./sailsTestsPreconfig.js');

//Jasmine TESTS
describe('Sails Todo Model Test CRUD', function() {
    // Should not reorder of tests because the order of executing is important !!!

    // Config data which will be send to API, and which will be asserted
    var data = {
      id:       null, // ID of Model instance, to test FIND, UPDATE and DELETE
      text:     "test to create todo task čćšđžČĆŠĐgdfgdfgdfĐŽ !@#$$%$#%^$%^",
      duration: 78
    };

    beforeEach(function() {
      // TODO: Init database (truncnate tables - prepare for testing)
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
              }
          })
        }
        // All HTTP request are ASYNC, with protractor.promise all requests are SYNC (linear in time)
        var flow = protractor.promise.controlFlow();
        flow.execute(request).then(function(response) {
          // Parse body, because returned as JSON
          var result = response.message.toJSON();
          var body = JSON.parse(result.body);
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

    it('2. Should FindOne a Todo instance', function() {
        function request() {
          return API.get('/todo/' + data.id, {})
        }
        var flow = protractor.promise.controlFlow();
        flow.execute(request).then(function(response) {
          var result = response.message.toJSON();
          var body = JSON.parse(result.body);
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
              }
          })
        }
        var flow = protractor.promise.controlFlow();
        flow.execute(request).then(function(response) {
          var result = response.message.toJSON();
          var body = JSON.parse(result.body);
          // Asserts
          expect(result.statusCode).toEqual(200);
          expect(body.text).toEqual(data.text);
          expect(body.duration).toEqual(data.duration);
          expect(body.createdAt).toBeDefined();
          expect(body.updatedAt).toBeDefined();
          expect(body.id).toEqual(data.id);
        });
    });

    it('4. Should Destroy a Todo instance', function() {
        function request() {
          return API.del('/todo/' + data.id, {})
        }
        var flow = protractor.promise.controlFlow();
        // First request should delete and return instance object
        flow.execute(request).then(function(response) {
          var result = response.message.toJSON();
          var body = JSON.parse(result.body);
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
          expect(result.body).toEqual("No record found with the specified `id`.");
        });
    });
});
