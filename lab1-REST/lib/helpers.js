// Check if string is in array of strings
function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
}

// Only console.log if --verbose option is present
function verbose() {
  if (inArray('--verbose', process.argv)) {
    var _logs = 1 <= arguments.length ? [].slice.call(arguments, 0) : [];
    for (var i = 0; i < _logs.length; i++) {
      console.log(_logs[i]);
    }
  }
}

// Module exports
module.exports = {
  inArray: inArray,
  verbose: verbose
}
