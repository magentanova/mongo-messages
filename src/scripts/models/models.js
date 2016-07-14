import Backbone from 'backbone'
import $ from 'jquery'
import {APP_NAME} from '../app'

const MsgModel = Backbone.Model.extend({
	urlRoot: "/api/messages",
	// warning: behind-the-scenes magic
	// when you sync with the server, read the ._id property
	// off the returned record, and assign it into your .id
	// property
	idAttribute: "_id"
})

const MsgCollection = Backbone.Collection.extend({
	model: MsgModel,
	url: "/api/messages"
})

const UserModel = Backbone.Model.extend({
	register: function(email,password) {
		return $.ajax({
			type: 'post',
			url: '/auth/register',
			data: {
				email: email,
				password: password
			}
		}).then((email,password)=>this.login(email,password))
	},
	login: function(email,password) {
		return $.ajax({
			type: 'post',
			url: '/auth/login',
			data: {
				email: email,
				password: password
			}
		}).then((userData) => {
			localStorage[APP_NAME] = JSON.stringify(userData)
		})
	},
	logout: function() {
		return $.getJSON('/auth/logout').then(()=>{
			localStorage[APP_NAME] = null
		})
	}
})

UserModel.getCurrentUser = function() {
		return localStorage[APP_NAME] ? JSON.parse(localStorage[APP_NAME]) : null
	}

export {UserModel,MsgModel,MsgCollection}