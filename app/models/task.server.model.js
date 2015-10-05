'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Task Schema
 */
var TaskSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Task name',
		trim: true
	},
	description: {
		type: String,
		trim: true
	},
	sets: [],
	reps: [],
	weights: [],
	baseLift: {
		type: String,
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	workoutplan: {
		type: Schema.ObjectId,
		ref: 'Workoutplan'
	}
});

mongoose.model('Task', TaskSchema);