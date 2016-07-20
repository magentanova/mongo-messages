import React from 'react'
import ReactFilepicker from 'react-filepicker'
import {MsgModel} from '../models/models'
import {User} from '../models/models'
import ACTIONS from '../actions'
import Header from './header'

const FP_KEY = 'AfFHcI8TzS3qDxGPvEvLxz'

const ComposeView = React.createClass({
	render: function() {
		return (
			<div className="composeView">
				<Header />
				<ComposeForm />
			</div>
			)
	}
})

const ComposeForm = React.createClass({

	getInitialState: function() {
		return {
			tags: []
		}
	},

	_addTag: function(e) {
		if (e.keyCode === 13) {
			e.preventDefault()
			this.setState({
				tags: this.state.tags.concat([e.target.value])
			})
			e.target.value = ''
		}
	},

	_saveMsg: function(e) {
		e.preventDefault()
		
		var newMsg = new MsgModel({
			to: e.target.to.value,
			from: User.getCurrentUser().email,
			content: e.target.content.value,
			tags: this.state.tags,
			imageUrl: this.imageUrl ? this.imageUrl : null
		})
		ACTIONS.saveModel(newMsg)
		e.target.reset()
		this.setState({
			tags: []
		})
	},

	_successHandler: function(e) {
		this.imageUrl = e.url
	},

	render: function() {
		const pickerOptions = {
		  buttonText: 'Attach an image',
		  buttonClass: 'filepicker',
		  services: ['COMPUTER', 'FACEBOOK', 'CLOUDAPP'],
		  imageMax: [600, 480]
		}

		return (
			<form onSubmit={this._saveMsg}>
				<input name="to" placeholder="to" />
				<input name="content" placeholder="content" />
				<input placeholder="enter a tag" onKeyDown={this._addTag} />
				<ReactFilepicker 
					apikey={FP_KEY} 
					onSuccess={this._successHandler}
					options={pickerOptions}
					defaultWidget={false}
				/>
				<p>{this.state.tags.join(',')}</p>
				<button type="submit" value="send!">send!</button>
			</form>
			)
	}
})

export default ComposeView