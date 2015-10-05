'use strict';

// Tasks controller
angular.module('tasks').controller('TasksController', ['$scope', '$stateParams', '$location', 'Authentication', 'Tasks',
	function($scope, $stateParams, $location, Authentication, Tasks) {
		$scope.authentication = Authentication;
		$scope.bases = [
			{name: 'Squat', lift: 'squat'}, 
			{name: 'Deadlift', lift: 'deadlift'}, 
			{name: 'Bench Press', lift: 'benchPress'}, 
			{name: 'Clean and Jerk', lift: 'cleanJerk'}, 
			{name: 'Snatch', lift: 'snatch'},
			{name: 'Front Squat', lift: 'frontSquat'}
		];

		// Create new Task
		$scope.create = function() {
			// Create new Task object
			var task = new Tasks ({
				name: this.name,
				description: this.description,
				reps: this.reps,
				sets: this.sets,
				weights: this.weights,
				baseLift: this.baseLift
			});

			// Redirect after save
			task.$save(function(response) {
				$location.path('workoutplans/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Task
		$scope.remove = function(task) {
			if ( task ) { 
				task.$remove();

				for (var i in $scope.tasks) {
					if ($scope.tasks [i] === task) {
						$scope.tasks.splice(i, 1);
					}
				}
			} else {
				$scope.task.$remove(function() {
					$location.path('tasks');
				});
			}
		};

		// Update existing Task
		$scope.update = function() {
			var task = $scope.task;

			task.$update(function() {
				$location.path('tasks/' + task._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Tasks
		$scope.find = function() {
			$scope.tasks = Tasks.query();
		};

		// Find existing Task
		$scope.findOne = function() {
			$scope.task = Tasks.get({ 
				taskId: $stateParams.taskId
			});
		};
	}
]);