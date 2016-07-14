let Router = require('express').Router;
const apiRouter = Router()
let helpers = require('../config/helpers.js')

let User = require('../db/schema.js').User
let Msg = require('../db/schema.js').Msg

console.log('edited')
// read many
apiRouter.get('/messages',function(request,response) {
  //first argument gives the criteria (WHICH msgs do i want)
  // console.log(request.user.email)
  console.log(request.user)
  let crit = request.user ? {to: request.user.email} : {}
  console.log(crit)
  Msg.find(crit,function(err,records) {
    console.log(records)
    response.send(records)
  })
})  

// write one
apiRouter.post('/messages',function(request,response) {
  let targetUser = request.body.to
  User.findOne({email:targetUser},function(err,user) {
    if (user) {
      let newRecord = new Msg(request.body)
      newRecord.save(function(err) {
        if (err) {
          response.send(err)
        }
        else {
          response.json(newRecord)
        }
      })
    }
    else {
      response.json({
        error: "no user with that name!"
      })
    }
  })
})

apiRouter.delete('/messages/:_id',function(request,response){
  //request.params contains the variables that were in the route pattern, expressed in the form 
  // [route placeholder]: [value sent]
  let theId = request.params._id
  // console.log(request.body)
  Msg.remove({_id:theId},function(err) {
    if (err) {
      response.json({
        error: err
      })
    }
    else {
      response.status(200).json({
        msg: 'record successfully deleted!'
      })
    }
  })
})

//read all users
apiRouter.get('/users',function(request,response){
  User.find({},function(err,records) {
    if (err) {
      response.send(err)
    }
    else {
      response.json(records)
    }
  })
})

module.exports = apiRouter