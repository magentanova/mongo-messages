let Router = require('express').Router;
const apiRouter = Router()
let helpers = require('../config/helpers.js')
let User = require('../db/schema.js').User
let Msg = require('../db/schema.js').Msg


apiRouter.get('/migrateAll',function(request,response){
  Msg.find({},function(err,records) {
    records.forEach(function(rec) {
      console.log(rec.tags.length)
      if (true) {
        let tagsArray = []
        rec.tags = {
          tagNames: tagsArray,
          tagCount: tagsArray.length
        }
        console.log(rec.tags)
        rec.save()
      }
    })
    response.json(records)
  })
})
// read many
apiRouter.get('/messages',function(request,response) {
  //first argument gives the criteria (WHICH msgs do i want)
  console.log('getting messages')
  Msg.find({},function(err,records) {
    response.send(records)
  })
})  

// read many
apiRouter.get('/myMessages',function(request,response) {
  //first argument gives the criteria (WHICH msgs do i want)
  if (request.user) { // if there is currently a logged-in user
    Msg.find({to:request.user.email}, function(err,records) {
      if (err) {
        response.json({
          error: err
        })
      }
      else {
        response.json(records)
      }
    })
  }
  else {
    response.status(404).json({
      error: 'no one is logged in'
    })
  }
})

apiRouter.get('/messages',function(request,response) {
  Msg.find(request.query,function(err,records) {
    if (err) {
      response.json({
        error: err
      })
    }
    else {
      response.json(records)
    }
  })
})

apiRouter.put('/messages/:_id', function(request, response){
    var id = request.params._id
    console.log('the ID>>>>>>>>', id)
    Msg.findByIdAndUpdate(id, request.body, function(err, record){
        if (err) {
          response.json({
            error: err
          })
        }
        else {

          console.log('record >>>>>', record)
          response.json(record)
        }
      })
})



// write one
apiRouter.post('/messages',function(request,response) {
  let newRecord = new Msg(request.body)
  newRecord.save(function(err) {
    if (err) {
      response.status(404).send(err)
    }
    else {
      response.json(newRecord)
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

apiRouter.put('/messages/:_id',function(request,response) {
  Msg.findByIdAndUpdate(request.params._id, {starred: request.body.starred}, function(err,record) {
    if (err) {
      response.status(500).send(err)
    }
    else {
      response.send({
        msg: 'record successfully updated',
        data: record
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

  apiRouter
    .get('/users/:_id', function(req, res){
      User.findById(req.params._id, "-password", function(err, record){
        if(err || !record ) return res.json(err) 
        res.json(record)
      })
    })
    .put('/users/:_id', function(req, res){
      User.findById(req.params._id, "-password",function(err, record){
        if(err || !record) return res.json(err)
        let recordWithUpdates = helpers.updateFields(record, req.body)
        recordWithUpdates.save(function(err){
          if(err) return res.json(err) 
          res.json(recordWithUpdates)
        })
      })
    })
    .delete('/users/:_id', function(req, res){
      User.remove({ _id: req.params._id}, (err) => {
        if(err) return res.json(err)
        res.json({
          msg: `record ${req.params._id} successfully deleted`,
          _id: req.params._id
        })
      })  
    })



module.exports = apiRouter