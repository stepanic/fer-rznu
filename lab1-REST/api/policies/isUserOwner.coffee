# Check that only Todo author can edit Todo instance
module.exports = (req, res, next) ->
  sails.log.verbose "Policy isUserOwner"

  id = req.param 'id'
  childId = null
  parentId = req.param 'parentid'
  # This policy can provide access to populate add
  if parentId
    childId = id
    id = parentId

  sails.log.verbose "Id: ", id, "ParentId: ", parentId, "ChildId: ", childId
  sails.log.verbose id
  sails.log.verbose current.user.id

  if parseInt(id) is parseInt(current.user.id)
    sails.log.verbose "Next"
    return next()
  else
    sails.log.verbose "NotNext"
    return res.forbidden()






