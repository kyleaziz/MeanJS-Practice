'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Measure = mongoose.model('Measure'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, measure;

/**
 * Measure routes tests
 */
describe('Measure CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Measure
		user.save(function() {
			measure = {
				name: 'Measure Name'
			};

			done();
		});
	});

	it('should be able to save Measure instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Measure
				agent.post('/measures')
					.send(measure)
					.expect(200)
					.end(function(measureSaveErr, measureSaveRes) {
						// Handle Measure save error
						if (measureSaveErr) done(measureSaveErr);

						// Get a list of Measures
						agent.get('/measures')
							.end(function(measuresGetErr, measuresGetRes) {
								// Handle Measure save error
								if (measuresGetErr) done(measuresGetErr);

								// Get Measures list
								var measures = measuresGetRes.body;

								// Set assertions
								(measures[0].user._id).should.equal(userId);
								(measures[0].name).should.match('Measure Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Measure instance if not logged in', function(done) {
		agent.post('/measures')
			.send(measure)
			.expect(401)
			.end(function(measureSaveErr, measureSaveRes) {
				// Call the assertion callback
				done(measureSaveErr);
			});
	});

	it('should not be able to save Measure instance if no name is provided', function(done) {
		// Invalidate name field
		measure.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Measure
				agent.post('/measures')
					.send(measure)
					.expect(400)
					.end(function(measureSaveErr, measureSaveRes) {
						// Set message assertion
						(measureSaveRes.body.message).should.match('Please fill Measure name');
						
						// Handle Measure save error
						done(measureSaveErr);
					});
			});
	});

	it('should be able to update Measure instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Measure
				agent.post('/measures')
					.send(measure)
					.expect(200)
					.end(function(measureSaveErr, measureSaveRes) {
						// Handle Measure save error
						if (measureSaveErr) done(measureSaveErr);

						// Update Measure name
						measure.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Measure
						agent.put('/measures/' + measureSaveRes.body._id)
							.send(measure)
							.expect(200)
							.end(function(measureUpdateErr, measureUpdateRes) {
								// Handle Measure update error
								if (measureUpdateErr) done(measureUpdateErr);

								// Set assertions
								(measureUpdateRes.body._id).should.equal(measureSaveRes.body._id);
								(measureUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Measures if not signed in', function(done) {
		// Create new Measure model instance
		var measureObj = new Measure(measure);

		// Save the Measure
		measureObj.save(function() {
			// Request Measures
			request(app).get('/measures')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Measure if not signed in', function(done) {
		// Create new Measure model instance
		var measureObj = new Measure(measure);

		// Save the Measure
		measureObj.save(function() {
			request(app).get('/measures/' + measureObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', measure.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Measure instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Measure
				agent.post('/measures')
					.send(measure)
					.expect(200)
					.end(function(measureSaveErr, measureSaveRes) {
						// Handle Measure save error
						if (measureSaveErr) done(measureSaveErr);

						// Delete existing Measure
						agent.delete('/measures/' + measureSaveRes.body._id)
							.send(measure)
							.expect(200)
							.end(function(measureDeleteErr, measureDeleteRes) {
								// Handle Measure error error
								if (measureDeleteErr) done(measureDeleteErr);

								// Set assertions
								(measureDeleteRes.body._id).should.equal(measureSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Measure instance if not signed in', function(done) {
		// Set Measure user 
		measure.user = user;

		// Create new Measure model instance
		var measureObj = new Measure(measure);

		// Save the Measure
		measureObj.save(function() {
			// Try deleting Measure
			request(app).delete('/measures/' + measureObj._id)
			.expect(401)
			.end(function(measureDeleteErr, measureDeleteRes) {
				// Set message assertion
				(measureDeleteRes.body.message).should.match('User is not logged in');

				// Handle Measure error error
				done(measureDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Measure.remove().exec();
		done();
	});
});