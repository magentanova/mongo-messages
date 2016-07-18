import {User} from './models/models'
import MSG_STORE from './msgStore'

const ACTIONS = {

	//.x.x..x.x.x.x..x.x.x.x.x..x.x.x.
	registerUser: function(email,password) {
		console.log(email,password)
		return User.register(email,password).then((resp) => {
			console.log(resp)
			return this.logUserIn(email,password)
		})
	},

	logUserIn: function(email,password) {
		return User.login(email,password).then(function(resp){
			console.log(resp)
			location.hash = "home"
		})
	},

	logUserOut: function() {
		return User.logout().then(() => {
			location.hash = "login"
		})
	},
	//.x.x..x.x.x.x..x.x.x.x.x..x.x.x.

	deleteMessage: function(modelId) {
		let msg = MSG_STORE.data.collection.get(modelId)
		msg.destroy()
	},

	fetchMessages: function() {
		MSG_STORE.data.collection.fetch()
	},

	toggleStar: function(modelId){
		let msg = MSG_STORE.data.collection.get(modelId)
		console.log(msg.get('starred'))
		msg.set({
			starred: msg.get('starred') ? false:true 
		})
		console.log("after", msg.get('starred'))
		MSG_STORE.emitChange()
		msg.save(null,{
			silent:true
		})



	}
}

export default ACTIONS