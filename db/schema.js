const mongoose = require('mongoose');
const createModel = mongoose.model.bind(mongoose);
const Schema = mongoose.Schema;

// ----------------------
// POSTS
// ----------------------
const postsSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  title:     { type: String, required: true },
  subtitle:  { type: String },
  body:      { type: String, required: [true, "No body-content, pls add"] },
  user:      {
                email: { type: String, required: [true, "No user email supplied"] },
                _id:   { type: Number, required: true }
             }
})

const msgSchema = new Schema({
	content: String,
	to: String,
	from: String
})

const listingSchema = new Schema({
	listingId: String,
	title: String,
	thumbnailUrl: String,
	price: String
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
