import React from 'react'
import $ from 'jquery'
import Header from './header'
import {MsgCollection} from '../models/models'
import MSG_STORE from '../msgStore'
import ACTIONS from '../actions'

var InboxView = React.createClass({

	getInitialState: function() {
		return MSG_STORE.getData()
	},

	componentWillUnmount: function() {
		MSG_STORE.off('updateComponent')
	},

	componentWillMount: function() {
		ACTIONS.fetchMessages()
		MSG_STORE.on('updateComponent',() => {
			this.setState(MSG_STORE.getData())
		})
	},

	render: function() {

		return (
			<div className="inboxView">
				<Header />
				<Tabs />
				<Inbox coll={this.state.collection} />
			</div>
			)
	}
})

const Tabs = React.createClass({


	render: function() {
		return (
			<div className="viewTabs">
			</div>
			)
	}
})

var Inbox = React.createClass({
	_makeMsg: function(record) {
		return <Msg key={record.id} record={record} />
	},

	render: function() {
		return (
			<div className="inbox">
				{this.props.coll.map(this._makeMsg)}
			</div>
			)
	}
})

var Msg = React.createClass({

	_handleDelete: function() {
		ACTIONS.deleteMessage(this.props.record.id)
	},

	_handleStar: function(){
		ACTIONS.toggleStar(this.props.record.id)
	},

	render: function() {
		let starClass = this.props.record.get('starred') ? 'star active':'star' 
		return (
			<div className="msg">
				<div className="msgDeets">
					<p>to: {this.props.record.get('to')}</p>
					<p>from: {this.props.record.get('from')}</p>
					<p>{this.props.record.get('content')}</p>
				</div>
				<button onClick={this._handleDelete} >X</button>
				<button onClick={this._handleStar} className={starClass}>&#9733;</button>
			</div>
			)
	}
})

var SearchForm = React.createClass({
	render: function() {
		return (
			<div className="searchForm">
				<input name="to" placeholder="to"></input>
				<input name="from" placeholder="from"></input>
			</div>
			)
	}
})


export default InboxView