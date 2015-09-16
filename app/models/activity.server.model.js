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
		type: String,
		default: '',
		required: 'Please fill Activity name',
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
	}
	// placeholder comment for tasks, which need to be created
	//, task: { type: Schema.ObjectId, ref: 'Task' }
});

mongoose.model('Activity', ActivitySchema);