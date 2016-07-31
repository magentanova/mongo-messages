const CronJob = require('cron').CronJob
const Msg = require('../db/schema').Msg

const readReddit = function() {
	console.log('starting cron job that will pull data every 5 seconds')
	new CronJob('*/5 * * * * *', function() {
		console.log('pulling data (not really)')
	} ,null, true)	
}

const saveToDB = function() {
	let oneMsg = new Msg({
		content: 'yoyo',
		to: 'you@you.com',
		from: 'me@me.com',
	})
	oneMsg.save(function(err) {
		if (err) {
			console.log(err)
		}
		else {
			console.log('saved!')
		}
	})
}

// note that in real life, you won't export the saving function. you'll 
// just run it inside your cron job.
module.exports = {
	readReddit: readReddit,
	testDBsave: saveToDB
}