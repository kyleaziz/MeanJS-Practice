'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Measure = mongoose.model('Measure'),
	User = mongoose.model('User'),
	_ = require('lodash');

/**
 * Create a Measure
 */
exports.create = function(req, res) {
	var measure = new Measure(req.body);
	measure.user = req.user;
	var user = req.user;

	measure.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			user.measure = measure._id;
			user.save(function(err) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				}
			});
			res.jsonp(measure);
		}
	});
};

/**
 * Show the current Measure
 */
exports.read = function(req, res) {
	res.jsonp(req.measure);
};

/**
 * Update a Measure
 */
exports.update = function(req, res) {
	var measure = req.measure ;

	measure = _.extend(measure , req.body);

	measure.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(measure);
		}
	});
};

/**
 * Delete an Measure
 */
exports.delete = function(req, res) {
	var measure = req.measure ;

	measure.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(measure);
		}
	});
};

/**
 * List of Measures
 */
exports.list = function(req, res) { 
	Measure.find({shareable: true}).sort('-created').populate('user', 'displayName').exec(function(err, measures) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(measures);
		}
	});
};

exports.listMine = function(req, res) { 
	var user = new User(req.user);
	Measure.find({user: user._id}).populate('user', 'displayName').exec(function(err, measures) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(measures);
		}
	});
};

/**
 * Measure middleware
 */
exports.measureByID = function(req, res, next, id) { 
	Measure.findById(id).populate('user', 'displayName').exec(function(err, measure) {
		if (err) return next(err);
		if (! measure) return next(new Error('Failed to load Measure ' + id));
		req.measure = measure ;
		next();
	});
};

/**
 * Measure authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.measure.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
