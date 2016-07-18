const mongoose = require('mongoose');
const createModel = mongoose.model.bind(mongoose);
const Schema = mongoose.Schema;

// ----------------------
// POSTS
// ----------------------

const msgSchema = new Schema({
	content: { type: String },
  thread_id: {type: String},
  reply_to: {type: String},
  starred: {type: Boolean, default: false},
	to: {type: String, required: true},
	from: {type: String, required: true},
  tags: {type: [String], default: []}
})

// ----------------------
// USERS
// ----------------------
const usersSchema = new Schema({
  // required for authentication: DO NOT TOUCH Or You May Get Punched
  email:     { type: String, required: true },
  password:  { type: String, required: true },
  // x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x
  
   // example of optional fields
  name:      { type: String },
  createdAt: { type: Date, default: Date.now }

})

module.exports = {
  User: createModel('User', usersSchema),
  Msg: createModel('Msg', msgSchema)
}
