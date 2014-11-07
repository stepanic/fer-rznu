exports.config = {
  // Your test script communicates directly Chrome Driver or Firefox Driver, bypassing any Selenium
  // Server. If this is true, settings for seleniumAddress and seleniumServerJar will be ignored.
  directConnect: true,

  // Spec patterns are relative to the location of this config.
  specs: [
    'user-spec.js',
    'todo-spec.js',
  ],

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {'args': ['--disable-extensions']}
  },

  // A base URL for your application under test. Calls to protractor.get()
  // with relative paths will be prepended with this.
  baseUrl: 'http://localhost:1337/api',

  jasmineNodeOpts: {
    onComplete: null,
    isVerbose: false,
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 10000
  }
};
