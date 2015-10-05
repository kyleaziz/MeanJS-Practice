'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Workoutplan Schema
 */
var WorkoutplanSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Workoutplan name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

WorkoutplanSchema.add({
	description: {
		type: String,
		default: '',
		trim: true
	},
	phase: {
		type: String,
		default: '',
		trim: true
	},
	program: {
		type: String,
		default: '',
		trim: true
	},
	date: {
		type: Date
	},
	tasks: [{
		type: Schema.ObjectId,
		ref: 'Task'
	}]
});

mongoose.model('Workoutplan', WorkoutplanSchema);