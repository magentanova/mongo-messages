import {UserModel} from './models/models'

const ACTIONS = {
	registerUser: function(email,password) {
		let newUsr = new UserModel()
		newUsr.register(email,password).then(function(resp){
			console.log(resp)
		})
	},

	logUserIn: function(email,password) {
		let newUsr = new UserModel()
		newUsr.login(email,password).then((resp)=>{
			location.hash = 'dashboard'
		})
	},

	logUserOut: function(email,password) {
		let newUsr = new UserModel()
		newUsr.logout().then((resp)=>{
			location.hash = 'login'
		}).fail((err)=>console.log(err))
	}
}

export default ACTIONS