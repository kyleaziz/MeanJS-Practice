'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Userstat = mongoose.model('Userstat'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, userstat;

/**
 * Userstat routes tests
 */
describe('Userstat CRUD tests', function() {
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

		// Save a user to the test db and create new Userstat
		user.save(function() {
			userstat = {
				name: 'Userstat Name'
			};

			done();
		});
	});

	it('should be able to save Userstat instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Userstat
				agent.post('/userstats')
					.send(userstat)
					.expect(200)
					.end(function(userstatSaveErr, userstatSaveRes) {
						// Handle Userstat save error
						if (userstatSaveErr) done(userstatSaveErr);

						// Get a list of Userstats
						agent.get('/userstats')
							.end(function(userstatsGetErr, userstatsGetRes) {
								// Handle Userstat save error
								if (userstatsGetErr) done(userstatsGetErr);

								// Get Userstats list
								var userstats = userstatsGetRes.body;

								// Set assertions
								(userstats[0].user._id).should.equal(userId);
								(userstats[0].name).should.match('Userstat Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Userstat instance if not logged in', function(done) {
		agent.post('/userstats')
			.send(userstat)
			.expect(401)
			.end(function(userstatSaveErr, userstatSaveRes) {
				// Call the assertion callback
				done(userstatSaveErr);
			});
	});

	it('should not be able to save Userstat instance if no name is provided', function(done) {
		// Invalidate name field
		userstat.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Userstat
				agent.post('/userstats')
					.send(userstat)
					.expect(400)
					.end(function(userstatSaveErr, userstatSaveRes) {
						// Set message assertion
						(userstatSaveRes.body.message).should.match('Please fill Userstat name');
						
						// Handle Userstat save error
						done(userstatSaveErr);
					});
			});
	});

	it('should be able to update Userstat instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Userstat
				agent.post('/userstats')
					.send(userstat)
					.expect(200)
					.end(function(userstatSaveErr, userstatSaveRes) {
						// Handle Userstat save error
						if (userstatSaveErr) done(userstatSaveErr);

						// Update Userstat name
						userstat.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Userstat
						agent.put('/userstats/' + userstatSaveRes.body._id)
							.send(userstat)
							.expect(200)
							.end(function(userstatUpdateErr, userstatUpdateRes) {
								// Handle Userstat update error
								if (userstatUpdateErr) done(userstatUpdateErr);

								// Set assertions
								(userstatUpdateRes.body._id).should.equal(userstatSaveRes.body._id);
								(userstatUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Userstats if not signed in', function(done) {
		// Create new Userstat model instance
		var userstatObj = new Userstat(userstat);

		// Save the Userstat
		userstatObj.save(function() {
			// Request Userstats
			request(app).get('/userstats')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Userstat if not signed in', function(done) {
		// Create new Userstat model instance
		var userstatObj = new Userstat(userstat);

		// Save the Userstat
		userstatObj.save(function() {
			request(app).get('/userstats/' + userstatObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', userstat.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Userstat instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Userstat
				agent.post('/userstats')
					.send(userstat)
					.expect(200)
					.end(function(userstatSaveErr, userstatSaveRes) {
						// Handle Userstat save error
						if (userstatSaveErr) done(userstatSaveErr);

						// Delete existing Userstat
						agent.delete('/userstats/' + userstatSaveRes.body._id)
							.send(userstat)
							.expect(200)
							.end(function(userstatDeleteErr, userstatDeleteRes) {
								// Handle Userstat error error
								if (userstatDeleteErr) done(userstatDeleteErr);

								// Set assertions
								(userstatDeleteRes.body._id).should.equal(userstatSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Userstat instance if not signed in', function(done) {
		// Set Userstat user 
		userstat.user = user;

		// Create new Userstat model instance
		var userstatObj = new Userstat(userstat);

		// Save the Userstat
		userstatObj.save(function() {
			// Try deleting Userstat
			request(app).delete('/userstats/' + userstatObj._id)
			.expect(401)
			.end(function(userstatDeleteErr, userstatDeleteRes) {
				// Set message assertion
				(userstatDeleteRes.body.message).should.match('User is not logged in');

				// Handle Userstat error error
				done(userstatDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Userstat.remove().exec();
		done();
	});
});