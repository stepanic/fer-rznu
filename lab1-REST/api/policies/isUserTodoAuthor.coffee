# Check that only Todo author can edit Todo instance
module.exports = (req, res, next) ->
  sails.log.verbose "Policy isUserTodoAuthor"

  id = req.param 'id'
  childId = null
  parentId = req.param 'parentid'
  # This policy can provide access to populate add
  if parentId
    childId = id
    id = parentId


  Todo.findOne
    id: id
    (err, todo) ->
      sails.log.verbose "Error: ", err
      sails.log.verbose "Todo: ", todo

      if err
        return res.badRequest();
      if todo
        current.todo = todo
        return next()
      else
        return res.notFound();


