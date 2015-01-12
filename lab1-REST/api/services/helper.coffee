# Application helpers
#

fs = require("fs")
util = require("util")
log_file = fs.createWriteStream("request.log",
  flags: "a+"
)
log_stdout = process.stdout
requestLogger = (d) -> #
  log_file.write util.format(d) + "\n"
  log_stdout.write util.format(d) + "\n"
  return

module.exports =
  requestLogger: requestLogger
