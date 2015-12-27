'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Measure Schema
 */
var MeasureSchema = new Schema({
	snatchORM: [
  	Schema.Types.Mixed
	],
	frontSquatORM: [
  	Schema.Types.Mixed
	],
	backSquatORM: [
  	Schema.Types.Mixed
	],
	benchORM: [
  	Schema.Types.Mixed
	],
	cleanJerkORM: [
  	Schema.Types.Mixed
	],
	pushPressORM: [
  	Schema.Types.Mixed
	],
	deadLiftORM: [
  	Schema.Types.Mixed
	],
	pushPressFive: [
  	Schema.Types.Mixed
	],
	frontSquatFive: [
  	Schema.Types.Mixed
	],
	thrusterFive: [
  	Schema.Types.Mixed
	],
	ohSquatFive: [
  	Schema.Types.Mixed
	],
	bodyWeight: [
  	Schema.Types.Mixed
	],
	beepTest: [
		Schema.Types.Mixed
	],
	sixLengths: [
		Schema.Types.Mixed
	],
	burpeeTest: [
		Schema.Types.Mixed
	],
	kmRow: [
		Schema.Types.Mixed
	],
	chinUps: [
		Schema.Types.Mixed
	],
	longJump: [
		Schema.Types.Mixed
	],
	boxJump: [
		Schema.Types.Mixed
	],
	shareable: {
		type: Boolean,
		default: false
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Measure', MeasureSchema);