/**
 * Protractor
 *
 * ---------------------------------------------------------------
 *
 * This grunt task is configured to run E2E tests with Protractor
 *
 * For usage docs see:
 * 		https://www.npmjs.org/package/grunt-protractor-runner
 */
module.exports = function(grunt) {

	grunt.config.set('protractor', {
		options: {
      configFile: "tests/e2e/conf.js", // Default config file, primary CONFIG file, recommended to edit it instead of this file
      keepAlive: true, // If false, the grunt process stops when the test fails.
      noColor: false, // If true, protractor will not use colors in its output.
      args: {}
    },
    dev: {   // Grunt requires at least one target to run so you can simply put 'all: {}' here too.
      options: {
        args: {
          verbose: true,
        }
      }
    },
    dist: {
      options: {
        args: {
        }
      }
    },
	});

	grunt.loadNpmTasks('grunt-protractor-runner');
};
