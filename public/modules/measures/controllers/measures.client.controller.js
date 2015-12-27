'use strict';

// Measures controller
angular.module('measures').controller('MeasuresController', ['$scope', '$log', '$stateParams', '$location', 'Authentication', 'Measures', 'MyMeasures',
	function($scope, $log, $stateParams, $location, Authentication, Measures, MyMeasures) {
		$scope.authentication = Authentication;
		$scope.date = new Date();
		$scope.names = [
			
			{dbid: 'bodyWeight', name: 'Bodyweight', units: 'lbs'},
			{dbid: 'frontSquatORM', name: 'Front Squat One Rep Max', units: 'Kgs'},
			{dbid: 'frontSquatFive', name: 'Front Squat Five Rep Max', units: 'Kgs'},
			{dbid: 'backSquatORM', name: 'Back Squat One Rep Max', units: 'Kgs'},
			{dbid: 'cleanJerkORM', name: 'Clean and Jerk One Rep Max', units: 'Kgs'},
			{dbid: 'thrusterFive', name: 'Thruster Five Rep Max'},
			{dbid: 'snatchORM', name: 'Snatch One Rep Max', units: 'Kgs'},
			{dbid: 'ohSquatFive', name: 'Overhead Squat Five Rep Max', units: 'Kgs'},
			{dbid: 'benchORM', name: 'Bench Press One Rep Max', units: 'Kgs'},
			{dbid: 'deadLiftORM', name: 'Deadlift One Rep Max', units: 'Kgs'},
			{dbid: 'pushPressORM', name: 'Push Press One Rep Max', units: 'Kgs'},
			{dbid: 'pushPressFive', name: 'Push Press Five Rep Max', units: 'Kgs'},
			{dbid: 'longJump', name: 'Max Long Jump', units: 'inches'},
			{dbid: 'boxJump', name: 'Max Box Jump', units: 'inches'},
			{dbid: 'chinUps', name: 'Max Chin Ups', units: 'chin-ups'},
			{dbid: 'burpeeTest', name: '90 Second Burpee Test', units: 'Burpees'},
			{dbid: 'kmRow', name: '1000m Row', units: 'seconds'},
			{dbid: 'sixLengths', name: '6 Lengths Time', units: 'seconds'},
			{dbid: 'beepTest', name: 'Beep Test Score', units: 'level'}
		];
		$scope.forminput = {};
		$scope.formVisible = {};

		// Create new Measure
		$scope.create = function() {
			// Create new Measure object
			var measure = new Measures ({
				snatchORM: [{value: this.snatchORMval, date: $scope.date}]
			});

			// Redirect after save
			measure.$save(function(response) {
				$location.path('measures/' + response._id);

				// Clear form fields
				$scope.snatchORM = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.createEmpty = function() {
			// Create new Measure object
			var measure = new Measures ({});

			// Redirect after save
			measure.$save(function(response) {
				$location.path('measures/' + response._id + '/edit');
				// Clear form fields
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Measure
		$scope.remove = function(measure) {
			if ( measure ) { 
				measure.$remove();

				for (var i in $scope.measures) {
					if ($scope.measures [i] === measure) {
						$scope.measures.splice(i, 1);
					}
				}
			} else {
				$scope.measure.$remove(function() {
					$location.path('measures');
				});
			}
		};

		// Update existing Measure
		$scope.update = function() {
			var measure = $scope.measure;
			measure.$update(function() {
				$location.path('measures/' + measure._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.clearForm = function() {
			$scope.forminput = {};
		};

		$scope.hideNewMeasure = function() {
			$scope.formVisible = {};
		};
		//Push new stats onto existing record
		$scope.addMeasure = function(dbid, valParam, unitParam) {
			$scope.measure[dbid].unshift({value: valParam, date: $scope.date, units: unitParam});
			var measure = $scope.measure;
			measure.$update(function() {
				//$location.path('measures/' + measure._id);
				$log.log('The measure should have saved');
				$scope.clearForm();
				$scope.hideNewMeasure();
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
		
		$scope.showForm = function(param) {
			$scope.formVisible[param] = true;
		};

		$scope.makeShareable = function() {
			$scope.measure.shareable = true;
			var measure = $scope.measure;
			measure.$update(function() {
				console.log('The measure should have saved and is now shared');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.unShare = function() {
			$scope.measure.shareable = false;
			var measure = $scope.measure;
			measure.$update(function() {
				console.log('The measure should have saved and is no longer shared');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.goEdit = function(mID) {
			$location.path('measures/' + mID + '/edit');
		};

		// Find existing Measure
		$scope.findOne = function() {
			$scope.measure = Measures.get({ 
				measureId: $stateParams.measureId
			});
		};

		$scope.find = function() {
			$scope.measures = Measures.query();
		};

		$scope.findMine = function() {
			$scope.measures = MyMeasures.query();
			//Userstats.findMine($scope.user);
		};

		$scope.findMyMeasure = function(mID) {
			$scope.measure = Measures.get({ 
				measureId: mID
			});
		};
	}
]);