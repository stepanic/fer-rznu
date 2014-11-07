# Login for REST API
module.exports = (req, res, next) ->
  sails.log.verbose "Policy hasMasterToken"
  sails.log.verbose req.headers

  secret = process.env.MASTER_SECRET ||"gFNNkdQ5WrysBcujHKMJY8Ewy8XNsAcY"

  if req.headers.token? and req.headers.token is secret
    return next()
  else
    return res.forbidden()



