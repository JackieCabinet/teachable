var hooks = require('./hooks');


module.exports = function(app, express){
	app.post('/teachable-hook', hooks.teachable);
}