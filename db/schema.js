const mongoose = require('mongoose');
const createModel = mongoose.model.bind(mongoose);
const Schema = mongoose.Schema;

// ----------------------
// POSTS
// ----------------------

const msgSchema = new Schema({
	content: { type: String },
  reply_to: {type: String},
	to: {type: String, required: true},
	from: {type: String, required: true},
  starred: {type: Boolean, default: false},
  imageUrl: {type: String, default: null}  
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
}, {
  timestamps: true
})

module.exports = {
  User: createModel('User', usersSchema),
  Msg: createModel('Msg', msgSchema)
}
