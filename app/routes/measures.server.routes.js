'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var measures = require('../../app/controllers/measures.server.controller');

	// Measures Routes
	app.route('/measures')
		.get(measures.list)
		.post(users.requiresLogin, measures.create);

	app.route('/myMeasures')
		.get(measures.listMine);

	app.route('/measures/:measureId')
		.get(measures.read)
		.put(users.requiresLogin, measures.hasAuthorization, measures.update)
		.delete(users.requiresLogin, measures.hasAuthorization, measures.delete);

	// Finish by binding the Measure middleware
	app.param('measureId', measures.measureByID);
};
