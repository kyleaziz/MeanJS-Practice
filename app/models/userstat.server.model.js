'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Userstat Schema
 */
var UserstatSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Userstat name',
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

mongoose.model('Userstat', UserstatSchema);