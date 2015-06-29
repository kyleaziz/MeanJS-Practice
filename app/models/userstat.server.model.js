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
	snatchMax: {
  	type: Number
	},
	cleanJerkMax: {
  	type: Number
	},
	backSquatMax: {
  	type: Number
	},
	benchMax: {
  	type: Number
	},
	deadMax: {
  	type: Number
	},
	sixLengthTime: {
  	type: Number
	},
	burpeeMax: {
  	type: Number
	},
	kmRow: {
  	type: Number
	},
	chinMax: {
  	type: Number
	},
	plankTime: {
  	type: Number
	},
	lpMileTime: {
  	type: Number
	},
	boxJumpMax: {
  	type: Number
	},
	longJumpMax:{
  	type: Number
  },
	beepTestScore: {
		type: Number
  },
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	testWeek: {
		type: String
	}
});

mongoose.model('Userstat', UserstatSchema);