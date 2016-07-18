import MESSAGE_STORE from './store'
import {User} from './models/models'

const ACTIONS = {
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

	changeView: function(viewName) {
		MESSAGE_STORE.set('viewType',viewName)
	},

	fetchData: function() {
		MESSAGE_STORE.data.collection.fetch()
	},

	removeModel: function(id) {
		let mod = MESSAGE_STORE.data.collection.get(id)
		mod.destroy()
	},

	saveModel: function(mod) {
		mod.save()
		MESSAGE_STORE.data.collection.add(mod)
	},

	searchByTag: function(tag) {
		MESSAGE_STORE.data.collection.fetch({
			url: '/api/messages',
			data: {
				tags: tag
			}
		})
	},

	starMessage: function(id) {
		let mod = MESSAGE_STORE.data.collection.get(id)
		mod.set('starred',mod.get('starred') ? false : true)
		mod.save().then(function(resp) {
			console.log(resp)
		})
		MESSAGE_STORE.data.collection.trigger('update')
	}
}

export default ACTIONS