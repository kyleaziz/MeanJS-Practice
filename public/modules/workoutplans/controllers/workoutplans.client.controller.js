'use strict';

// Workoutplans controller
angular.module('workoutplans').controller('WorkoutplansController', ['$scope', '$stateParams', '$location', 'Authentication', 'Workoutplans', 'Tasks',
	function($scope, $stateParams, $location, Authentication, Workoutplans, Tasks) {
		$scope.authentication = Authentication;
		$scope.bases = [
			{name: 'Squat', lift: 'squat'}, 
			{name: 'Deadlift', lift: 'deadlift'}, 
			{name: 'Bench Press', lift: 'benchPress'}, 
			{name: 'Clean and Jerk', lift: 'cleanJerk'}, 
			{name: 'Snatch', lift: 'snatch'},
			{name: 'Front Squat', lift: 'frontSquat'}
		];
		
		$scope.programs = [
			{name: 'Group Training'},
			{name: 'Athletes'},
			{name: 'BABEies'},
			{name: 'Performance'},
			{name: 'Bootcamp'},
			{name: 'Lift'}
		];

		// Create new Workoutplan
		$scope.create = function() {
			// Create new Workoutplan object
			var workoutplan = new Workoutplans ({
				name: this.name,
				description: this.description,
				phase: this.phase,
				program: this.program,
				date: this.date
			});

			// Redirect after save
			workoutplan.$save(function(response) {
				$location.path('workoutplans/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.createTask = function() {
			// Create new Task object
			var task = new Tasks ({
				name: this.taskName,
				description: this.taskDescription,
				reps: this.taskReps,
				sets: this.taskSets,
				weights: this.taskWeights,
				baseLift: this.taskBaseLift,
				workoutplan: this.workoutplan._id
			});

			// Redirect after save
			task.$save(function(response) {
				$location.path('workoutplans/' + response._id);
				// Clear form fields
				$scope.taskName = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Workoutplan
		$scope.remove = function(workoutplan) {
			if ( workoutplan ) { 
				workoutplan.$remove();

				for (var i in $scope.workoutplans) {
					if ($scope.workoutplans [i] === workoutplan) {
						$scope.workoutplans.splice(i, 1);
					}
				}
			} else {
				$scope.workoutplan.$remove(function() {
					$location.path('workoutplans');
				});
			}
		};

		// Update existing Workoutplan
		$scope.update = function() {
			var workoutplan = $scope.workoutplan;

			workoutplan.$update(function() {
				$location.path('workoutplans/' + workoutplan._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Add a task to existing workout
		$scope.addTask = function() {
			$scope.workoutplan.tasks.push({
				name: $scope.addTaskName,
				sets: $scope.addTaskSets,
				reps: $scope.addTaskReps,
				baseLift: $scope.addTaskBaseLift,
				weight: $scope.addTaskWeight,
				description: $scope.addTaskDescription
			});

			var workoutplan = $scope.workoutplan;

			workoutplan.$update(function() {
				$location.path('workoutplans/' + workoutplan._id +'/edit');
			
				//clear form fields
				$scope.addTaskName = '';
				$scope.addTaskSets = '';
				$scope.addTaskReps = '';
				$scope.addTaskBaseLift = '';
				$scope.addTaskWeight = '';
				$scope.addTaskDescription = '';

			
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Workoutplans
		$scope.find = function() {
			$scope.workoutplans = Workoutplans.query();
		};

		// Find existing Workoutplan
		$scope.findOne = function() {
			$scope.workoutplan = Workoutplans.get({ 
				workoutplanId: $stateParams.workoutplanId
			});
		};
	}
]);