'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Activity Schema
 */
var ActivitySchema = new Schema({
	name: {
		type: String
	},
	created: {
		type: Date,
		default: Date.now
	},
	baseLift: {
		type: String
	},
	reps: {
		type: Number
	},
	sets: {
		type: Number
	},
	weight: {
		type: Number
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}, 
	task: { 
		type: Schema.ObjectId, 
		ref: 'Task' 
	},
	workout: {
		type: Schema.ObjectId, 
		ref: 'Workoutplan' 
	}
});

mongoose.model('Activity', ActivitySchema);