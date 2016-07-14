const checkAuth = function(req, res, next){
  if(!req.user) res.json({
  	status: 500,
  	error: "no current user logged in"
  })
    else next()
}

const errorHandler = function(err, req, res, next) {
  res.json(err);
  return
} 


module.exports = {
  checkAuth: checkAuth,
  errorHandler: errorHandler
}