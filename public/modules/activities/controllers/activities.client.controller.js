'use strict';

// Activities controller
angular.module('activities').controller('ActivitiesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Activities', 'Workoutplans', 'Userstats',
	function($scope, $stateParams, $location, Authentication, Activities, Workoutplans, Userstats) {
		$scope.authentication = Authentication;
		$scope.wod = Workoutplans.get({ 
				workoutplanId: '56123e3ca1579acc49c17db7'
			});
		$scope.userstat = Userstats.get({ 
				userstatId: Authentication.user.latestStat
			});

		// Create new Activity
		$scope.create = function() {
			// Create new Activity object
			var activity = new Activities ({
				name: this.name,
				reps: this.reps,
				sets: this.sets,
				weight: this.weight,
				baseLift: this.baseLift,
				workout: this.wod,
				task: this.task
			});

			// Redirect after save
			activity.$save(function(response) {
				$location.path('activities/' + response._id);

				// Clear form fields
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Activity
		$scope.remove = function(activity) {
			if ( activity ) { 
				activity.$remove();

				for (var i in $scope.activities) {
					if ($scope.activities [i] === activity) {
						$scope.activities.splice(i, 1);
					}
				}
			} else {
				$scope.activity.$remove(function() {
					$location.path('activities');
				});
			}
		};

		// Update existing Activity
		$scope.update = function() {
			var activity = $scope.activity;

			activity.$update(function() {
				$location.path('activities/' + activity._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Activities
		$scope.find = function() {
			$scope.activities = Activities.query();
		};

		// Find existing Activity
		$scope.findOne = function() {
			$scope.activity = Activities.get({ 
				activityId: $stateParams.activityId
			});
		};

		$scope.findWorkout = function() {
			$scope.workoutplan = Workoutplans.get({ 
				workoutplanId: '56153637974a3e882c29c639'
			});
		};
	}
])
.directive('taskForm', function(taskReps, taskWeight, taskBaselift) {
  return {
    template: 'Name: {{customer.name}} Address: {{taskBaselift}}'
  };
});