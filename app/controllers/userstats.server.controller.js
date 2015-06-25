'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Userstat = mongoose.model('Userstat'),
	_ = require('lodash');

/**
 * Create a Userstat
 */
exports.create = function(req, res) {
	var userstat = new Userstat(req.body);
	userstat.user = req.user;

	userstat.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(userstat);
		}
	});
};

/**
 * Show the current Userstat
 */
exports.read = function(req, res) {
	res.jsonp(req.userstat);
};

/**
 * Update a Userstat
 */
exports.update = function(req, res) {
	var userstat = req.userstat ;

	userstat = _.extend(userstat , req.body);

	userstat.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(userstat);
		}
	});
};

/**
 * Delete an Userstat
 */
exports.delete = function(req, res) {
	var userstat = req.userstat ;

	userstat.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(userstat);
		}
	});
};

/**
 * List of Userstats
 */
exports.list = function(req, res) { 
	Userstat.find().sort('-created').populate('user', 'displayName').exec(function(err, userstats) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(userstats);
		}
	});
};

/**
 * Userstat middleware
 */
exports.userstatByID = function(req, res, next, id) { 
	Userstat.findById(id).populate('user', 'displayName').exec(function(err, userstat) {
		if (err) return next(err);
		if (! userstat) return next(new Error('Failed to load Userstat ' + id));
		req.userstat = userstat ;
		next();
	});
};

/**
 * Userstat authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.userstat.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
