 # User.coffee
 #
 # @description :: TODO: You might write a short summary of how this model works and what it represents here.
 # @docs        :: http://sailsjs.org/#!documentation/models
bcrypt = require 'bcrypt'

module.exports =

  attributes:
    username:
      type: 'string'
      required: true
      unique: true
    password:
      type: 'string'
      required: true
      minLength: 8
      protected: true

    todos:
      collection: 'todo'
      via: 'author'

    verifyPassword: (password) ->
      bcrypt.compareSync password, @password


  beforeCreate: (user, cb) ->

    sails.log.verbose user


    bcrypt.hash user.password, 10, (err, hash) ->
      sails.log.verbose "Bcrypt hash error: ", err
      sails.log.verbose "Bcrypt hash: ", hash
      user.password = hash
      cb()



