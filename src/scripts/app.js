import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import $ from 'jquery'
import InboxView from './views/InboxView'
import ComposeView from './views/ComposeView'
import LoginView from './views/LoginView'
import DashView from './views/DashView'
import {MsgCollection} from './models/models'
import {UserModel} from './models/models'

export const APP_NAME = "mongoMessages"

// const initialize = function() {
// 	$.get('/auth/checkAuth').then((resp)=> {
// 		if (resp.user) {
// 			localStorage[APP_NAME] = JSON.stringify(resp.user)
// 		}
// 		else {
// 			localStorage[APP_NAME] = null
// 		}
// 	})
// }

const app = function() {

	const MsgRouter = Backbone.Router.extend({
		routes: {
			"messages/read": "showMsgs",
			"messages/write": "showMsgEditor",
			"dash": "showDash",
			"login": "showLogin",
			"*catchall": "redirect"
		},

		redirect: function() {
			location.hash = "dash"
		},

		showDash: function() {
			ReactDOM.render(<DashView />, document.querySelector('.container'))
		},

		showLogin: function() {
			ReactDOM.render(<LoginView />, document.querySelector('.container'))
		},

		showMsgs: function() {
			var coll = new MsgCollection()
			coll.fetch()
			ReactDOM.render(<InboxView coll={coll} />, document.querySelector('.container'))
		},

		showMsgEditor: function() {
			ReactDOM.render(<ComposeView />, document.querySelector('.container'))
		},

		initialize: function() {
			this.on('route',function() {
				if (!UserModel.getCurrentUser()) {
					location.hash = "login"
				}
			})
			Backbone.history.start()
		}
	})

	new MsgRouter()
}

app()