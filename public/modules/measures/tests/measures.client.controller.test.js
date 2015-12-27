'use strict';

(function() {
	// Measures Controller Spec
	describe('Measures Controller Tests', function() {
		// Initialize global variables
		var MeasuresController,
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

			// Initialize the Measures controller.
			MeasuresController = $controller('MeasuresController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Measure object fetched from XHR', inject(function(Measures) {
			// Create sample Measure using the Measures service
			var sampleMeasure = new Measures({
				name: 'New Measure'
			});

			// Create a sample Measures array that includes the new Measure
			var sampleMeasures = [sampleMeasure];

			// Set GET response
			$httpBackend.expectGET('measures').respond(sampleMeasures);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.measures).toEqualData(sampleMeasures);
		}));

		it('$scope.findOne() should create an array with one Measure object fetched from XHR using a measureId URL parameter', inject(function(Measures) {
			// Define a sample Measure object
			var sampleMeasure = new Measures({
				name: 'New Measure'
			});

			// Set the URL parameter
			$stateParams.measureId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/measures\/([0-9a-fA-F]{24})$/).respond(sampleMeasure);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.measure).toEqualData(sampleMeasure);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Measures) {
			// Create a sample Measure object
			var sampleMeasurePostData = new Measures({
				name: 'New Measure'
			});

			// Create a sample Measure response
			var sampleMeasureResponse = new Measures({
				_id: '525cf20451979dea2c000001',
				name: 'New Measure'
			});

			// Fixture mock form input values
			scope.name = 'New Measure';

			// Set POST response
			$httpBackend.expectPOST('measures', sampleMeasurePostData).respond(sampleMeasureResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Measure was created
			expect($location.path()).toBe('/measures/' + sampleMeasureResponse._id);
		}));

		it('$scope.update() should update a valid Measure', inject(function(Measures) {
			// Define a sample Measure put data
			var sampleMeasurePutData = new Measures({
				_id: '525cf20451979dea2c000001',
				name: 'New Measure'
			});

			// Mock Measure in scope
			scope.measure = sampleMeasurePutData;

			// Set PUT response
			$httpBackend.expectPUT(/measures\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/measures/' + sampleMeasurePutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid measureId and remove the Measure from the scope', inject(function(Measures) {
			// Create new Measure object
			var sampleMeasure = new Measures({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Measures array and include the Measure
			scope.measures = [sampleMeasure];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/measures\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleMeasure);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.measures.length).toBe(0);
		}));
	});
}());