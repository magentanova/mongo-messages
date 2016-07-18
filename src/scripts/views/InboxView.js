import React from 'react'
import $ from 'jquery'
import Header from './header'
import {MsgCollection} from '../models/models'
import ACTIONS from '../actions'
import MESSAGE_STORE from  '../store'


var InboxView = React.createClass({

	getInitialState: function() {
		return MESSAGE_STORE.getData()
	},

	componentWillUnmount: function() {
		MESSAGE_STORE.off('updateComponent')
	},

	componentWillMount: function() {
		ACTIONS.fetchData()
		MESSAGE_STORE.on('updateComponent',()=>{
			this.setState(MESSAGE_STORE.getData())
		})
	},

	render: function() {
		let collToPass = this.state.collection
		switch (this.state.viewType) {
			case 'starred': 
				collToPass = this.state.collection.where({starred: true})
				break
			case 'unstarred':
				collToPass = this.state.collection.where({starred: false})
		}

		return (
			<div className="inboxView">
				<Header />
				<Tabs />
				<Inbox coll={collToPass} />
			</div>
			)
	}
})

const Tabs = React.createClass({

	_handleViewChange: function(e) {
		ACTIONS.changeView(e.target.value)
	},

	_handleTagSearch: function(e) {
		ACTIONS.searchByTag(e.target.value)
	},

	render: function() {
		return (
			<div className="viewTabs">
				{['all','starred','unstarred'].map((str,i)=><button key={i} onClick={this._handleViewChange} value={str}>{str}</button>)}
				<input onKeyDown={this._handleTagSearch} />
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

	_removeModel: function() {
		ACTIONS.removeModel(this.props.record.id)
	},

	_toggleStarred: function() {
		ACTIONS.starMessage(this.props.record.id)
	},

	render: function() {
		let starClass = this.props.record.get('starred') ? 'star active' : 'star'
		return (
			<div className="msg">
				<div className="msgDeets">
					<p>to: {this.props.record.get('to')}</p>
					<p>from: {this.props.record.get('from')}</p>
					<p>{this.props.record.get('content')}</p>
				</div>
				<button className={starClass} onClick={this._toggleStarred}>&#9733;</button>
				<button onClick={this._removeModel} >X</button>
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