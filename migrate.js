let Msg = require('./db/schema.js').Msg

Msg.find({},function(err,records) {
	console.log(records)
	console.log(err)
})