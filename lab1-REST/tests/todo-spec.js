// Config to access to Sails.js API via REST interface
var API = require('./sailsTestsPreconfig.js');

//Jasmine TESTS
describe('sails todo Model DEMO', function() {

    beforeEach(function() {
      // TODO: Init database (truncnate tables - prepare for testing)
    });

    it('should add a todo', function() {
        // Config data which will be send to API, and which will be asserted
        var data = {
          text: "test to create todo task čćšđžČĆŠĐgdfgdfgdfĐŽ !@#$$%$#%^$%^",
          duration: 78
        };
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
        });
    });
});
