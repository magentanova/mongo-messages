global.PROJECT_NAME = "mongo-messages"

if (!global.PROJECT_NAME) { //« set by npm run init-dev »
	throw new Error('no project name set. did you forget to run "npm run init-dev"?')
}
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x



const bodyParser = require('body-parser');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const renderFile = require('ejs').renderFile

// Load Configuration
const appMiddleWare = require('./config/middleware.js')
const appSecrets = require('./config/secrets.js')
const appAuthentication = require('./config/auth.js')
const connectToDB = require('./config/db-setup.js').connectToDB

// Import Routers
const indexRouter = require('./routes/indexRouter.js')
const authRouter = require('./routes/authRouter.js')
const apiRouter = require('./routes/apiRouter.js')

// Load DB User Model (for appAuthentication configuration)
const User = require('./db/schema.js').User
const RedditReader = require('./redditCron/reader.js')


// =========
// RUN APP
// =========
const app = express()
const PORT = process.env.PORT || 3000
app.set('port', PORT)

// =========
// VIEW ENGINE
// =========
app.set('views', './dist/views');
app.engine('html', renderFile)
app.set('view engine', 'html');

// =========
// DATABASE
// =========
connectToDB(global.PROJECT_NAME)

// =========
// APPLICATION MIDDLEWARE 
// =========
app.use( express.static( __dirname + '/dist/assets') );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded() );
app.use( cookieParser() );
app.use( session({secret: appSecrets.sessionSecret }) );
app.use( passport.initialize() );
app.use( passport.session() );
app.use( appMiddleWare.cookifyUser )
appAuthentication(User)
// 
// =========
// ROUTERS
// =========

app.use( '/auth', authRouter )
app.use( '/', indexRouter )
app.use( '/api', apiRouter )
app.use(appMiddleWare.errorHandler)

app.listen(PORT,function() {
  console.log('\n\n===== listening for requests on port ' + PORT + ' =====\n\n')
})

RedditReader.readReddit()
// RedditReader.testDBsave()
