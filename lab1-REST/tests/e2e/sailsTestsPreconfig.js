// Node.js module for sending HTTP requests
var request = require('request');
var jar = request.jar();
var req = request.defaults({
    jar : jar
});

// Config
var sailsBaseUrl = process.env.BASE_URL || "http://localhost:1337/api";

// Helpers
var Helper = require("../../lib/helpers.js");
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
    console.log.verbose("POST Calling", url);
    req.post(url, params, function(error, message) {
        console.log.verbose("Done POST call to", url);
        defer.fulfill({ error: error, message: message });
    });
    return defer.promise;
}
/**
 * Function for sending HTTP GET request
 * @method get
 * @param {} url
 * @param {} params
 * @return MemberExpression
 */
function get(url, params) {
    var defer = protractor.promise.defer();
    url = sailsBaseUrl + url;
    console.log.verbose("GET Calling", url);
    req.get(url, params, function(error, message) {
        console.log.verbose("Done GET call to", url);
        defer.fulfill({ error: error, message: message });
    });
    return defer.promise;
}
/**
 * Function for sending HTTP PUT request
 * @method put
 * @param {} url
 * @param {} params
 * @return MemberExpression
 */
function put(url, params) {
    var defer = protractor.promise.defer();
    url = sailsBaseUrl + url;
    console.log.verbose("PUT Calling", url);
    req.put(url, params, function(error, message) {
        console.log.verbose("Done PUT call to", url);
        defer.fulfill({ error: error, message: message });
    });
    return defer.promise;
}
/**
 * Function for sending HTTP DELETE request
 * @method del
 * @param {} url
 * @param {} params
 * @return MemberExpression
 */
function del(url, params) {
    var defer = protractor.promise.defer();
    url = sailsBaseUrl + url;
    console.log.verbose("DELETE Calling", url);
    req.del(url, params, function(error, message) {
        console.log.verbose("Done DELETE call to", url);
        defer.fulfill({ error: error, message: message });
    });
    return defer.promise;
}

// Module exports, public API
module.exports = {
  post: post,
  get: get,
  put: put,
  del: del,
  parse: Helper.parseJSON
}
