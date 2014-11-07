# Login for REST API
module.exports = (req, res, next) ->
  sails.log.verbose "Policy simpleRESTAuth"
  sails.log.verbose req.headers

  User.findOne
    username: req.headers.username
    (err, user) ->
      sails.log.verbose err
      sails.log.verbose user

      if err
        return res.badRequest();
      if user
        if user.verifyPassword req.headers.password
          current.user = user
          sails.log current.user
          return next()
        else
          return res.forbidden();
      else
        return res.forbidden();


