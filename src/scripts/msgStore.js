import Backbone from 'backbone'
import _ from 'underscore'
import {MsgCollection} from './models/models'


const MSG_STORE = _.extend(Backbone.Events,{

	data: {
		collection: new MsgCollection(),
		viewType: 'all'
	},

	emitChange: function() {
		this.trigger('updateComponent')
	},

	getData: function() {
		return _.clone(this.data) // NOTE: This is not really a perfect clone! It is philosophically correct,
		// but we need to make a deeper clone eventually.
	},

	set: function(prop,value) {
		if (this.data[prop] === undefined) {
			throw new Error("that thing don't exist in data")
		}
		this.data[prop] = value
		this.emitChange()
	},

	initialize: function() {
		this.data.collection.on('sync update', this.emitChange.bind(this))
	}
})

MSG_STORE.initialize()

export default MSG_STORE