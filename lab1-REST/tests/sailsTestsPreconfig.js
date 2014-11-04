// Node.js module for sending HTTP requests
var request = require('request');
var jar = request.jar();
var req = request.defaults({
    jar : jar
});

// Config
var sailsBaseUrl = "http://localhost:1337";

// Helpers
var Helper = require("../lib/helpers.js");
console.log.verbose = Helper.verbose;

/**
 * Function for sending HTTP POST request
 * @method post
 * @param {} url
 * @param {} params
 * @return MemberExpression
 */
function post(url, params) {
    var defer = protractor.promise.defer();
    url = sailsBaseUrl + url;
    console.log.verbose("Calling", url);
    req.post(url, params, function(error, message) {
        console.log.verbose("Done call to", url);
        defer.fulfill({ error: error, message: message });
    });
    return defer.promise;
}

// Module exports, public API
module.exports = {
  post: post
}
