import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import {User}  from './models/models'
import init from './init'
import Dashboard from './views/HomeView'
import InboxView from './views/InboxView'
import ComposeView from './views/ComposeView'
import LoginView from './views/LoginView'
import {MsgCollection} from './models/models'

const app = function() {

	const MsgRouter = Backbone.Router.extend({
		routes: {
			"messages/read": "showMsgs",
			"messages/write": "showMsgEditor",
			"home": "showHome",
			"login": "showLogin",
			"*catchall": "redirect"
		},

		redirect: function() {
			location.hash = "home"
		},

		showHome: function() {
			ReactDOM.render(<Dashboard />, document.querySelector('.container'))
		},

		showLogin: function() {
			ReactDOM.render(<LoginView />, document.querySelector('.container'))
		},

		showMsgs: function() {
			ReactDOM.render(<InboxView />, document.querySelector('.container'))
		},

		showMsgEditor: function() {
			ReactDOM.render(<ComposeView />, document.querySelector('.container'))
		},

		initialize: function() {
			this.on("route",(rtHandler)=> {
				if (!User.getCurrentUser()) {
					location.hash = "login"
				}
				else {
					if (rtHandler.toLowerCase().includes('login')) {
						location.hash = "home"
					}
				}
			})
			Backbone.history.start()
		}
	})

	new MsgRouter()
}

export const app_name = init()
app()
