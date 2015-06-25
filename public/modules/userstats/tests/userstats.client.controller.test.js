'use strict';

(function() {
	// Userstats Controller Spec
	describe('Userstats Controller Tests', function() {
		// Initialize global variables
		var UserstatsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Userstats controller.
			UserstatsController = $controller('UserstatsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Userstat object fetched from XHR', inject(function(Userstats) {
			// Create sample Userstat using the Userstats service
			var sampleUserstat = new Userstats({
				name: 'New Userstat'
			});

			// Create a sample Userstats array that includes the new Userstat
			var sampleUserstats = [sampleUserstat];

			// Set GET response
			$httpBackend.expectGET('userstats').respond(sampleUserstats);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.userstats).toEqualData(sampleUserstats);
		}));

		it('$scope.findOne() should create an array with one Userstat object fetched from XHR using a userstatId URL parameter', inject(function(Userstats) {
			// Define a sample Userstat object
			var sampleUserstat = new Userstats({
				name: 'New Userstat'
			});

			// Set the URL parameter
			$stateParams.userstatId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/userstats\/([0-9a-fA-F]{24})$/).respond(sampleUserstat);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.userstat).toEqualData(sampleUserstat);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Userstats) {
			// Create a sample Userstat object
			var sampleUserstatPostData = new Userstats({
				name: 'New Userstat'
			});

			// Create a sample Userstat response
			var sampleUserstatResponse = new Userstats({
				_id: '525cf20451979dea2c000001',
				name: 'New Userstat'
			});

			// Fixture mock form input values
			scope.name = 'New Userstat';

			// Set POST response
			$httpBackend.expectPOST('userstats', sampleUserstatPostData).respond(sampleUserstatResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Userstat was created
			expect($location.path()).toBe('/userstats/' + sampleUserstatResponse._id);
		}));

		it('$scope.update() should update a valid Userstat', inject(function(Userstats) {
			// Define a sample Userstat put data
			var sampleUserstatPutData = new Userstats({
				_id: '525cf20451979dea2c000001',
				name: 'New Userstat'
			});

			// Mock Userstat in scope
			scope.userstat = sampleUserstatPutData;

			// Set PUT response
			$httpBackend.expectPUT(/userstats\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/userstats/' + sampleUserstatPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid userstatId and remove the Userstat from the scope', inject(function(Userstats) {
			// Create new Userstat object
			var sampleUserstat = new Userstats({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Userstats array and include the Userstat
			scope.userstats = [sampleUserstat];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/userstats\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleUserstat);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.userstats.length).toBe(0);
		}));
	});
}());