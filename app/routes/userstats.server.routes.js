'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var userstats = require('../../app/controllers/userstats.server.controller');

	// Userstats Routes
	app.route('/userstats')
		.get(userstats.list)
		.post(users.requiresLogin, userstats.create);

	app.route('/myUserstats')
		.get(userstats.listMine);

	app.route('/monthUserstats')
		.get(userstats.listMonth);

	app.route('/userstats/:userstatId')
		.get(userstats.read)
		.put(users.requiresLogin, userstats.hasAuthorization, userstats.update)
		.delete(users.requiresLogin, userstats.hasAuthorization, userstats.delete);

	// Finish by binding the Userstat middleware
	app.param('userstatId', userstats.userstatByID);
};
