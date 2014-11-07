 # Todo.coffee
 #
 # @description :: TODO: You might write a short summary of how this model works and what it represents here.
 # @docs        :: http://sailsjs.org/#!documentation/models

module.exports =

  schema: true

  attributes:
    text:
      type: 'string'
      required: true
    duration:
      type: 'integer'
      required: true
    description:
      type: 'string'
      defaultsTo: ""

    author:
      model: 'user'
      required: true

  beforeValidate: (todo, cb) ->
    sails.log.verbose "Todo: ", todo
    if not todo.author?
      todo.author = current.user.id
    cb()

  beforeCreate: (todo, cb) ->
    sails.log.verbose "Todo: ", todo
    cb()


