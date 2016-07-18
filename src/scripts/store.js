import Backbone from 'backbone'
import {MsgCollection} from './models/models'
import _ from 'underscore'

const MESSAGE_STORE = _.extend(Backbone.Events,{

	data: {
		viewType: 'all',
		collection: new MsgCollection()
	},

	emitChange: function() {
		console.log('updating component in store')
		this.trigger('updateComponent')
	},

	getData: function() {
		return _.clone(this.data)
	},

	set: function(prop,val) {
		if (this.data[prop] === undefined) {
			throw new Error(`property ${prop} is not in the store`)
		}
		this.data[prop] = val
		this.emitChange()
	},

	initialize: function() {
		this.data.collection.on('sync update',this.emitChange.bind(this))
	}
})
	
MESSAGE_STORE.initialize()

export default MESSAGE_STORE