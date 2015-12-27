'use strict';

// Activities controller
angular.module('activities').controller('ActivitiesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Activities', 'Workoutplans', 'Userstats',
	function($scope, $stateParams, $location, Authentication, Activities, Workoutplans, Userstats) {
		$scope.authentication = Authentication;
		$scope.wodid = '561214765b37bf414af0b7de';
		$scope.wod = Workoutplans.get({ 
				workoutplanId: $scope.wodid
			});
		$scope.userstat = Userstats.get({ 
				userstatId: Authentication.user.latestStat
			});
		$scope.liftdefs = Workoutplans.get({ 
				workoutplanId: $scope.wodid
			});
		$scope.acts = Activities.get({workout: $scope.wodid});
		$scope.status = {tasks: [{sets:[,,,,,]},{sets:[,,,,,]},{sets:[,,,,,]},{sets:[,,,,,]},{sets:[,,,,,]},{sets:[,,,,,]},{sets:[,,,,,]}]};

		// Create new Activity
		$scope.create = function() {
			// Create new Activity object
			var activity = new Activities ({
				name: this.name,
				reps: this.reps,
				sets: this.sets,
				weight: this.weight//,
				//baseLift: this.baseLift,
				//workout: this.wod,
				//task: this.task
			});

			// Redirect after save
			activity.$save(function(response) {
				$location.path('activities/' + response._id);

				// Clear form fields
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		//copy of old create in case I eff things up
		$scope.createold = function() {
			// Create new Activity object
			var activity = new Activities ({
				name: this.name,
				reps: this.reps,
				sets: this.sets,
				weight: this.weights,
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

		//Save activity from the workout view
		$scope.storeact = function(workout, parindex, index) {
			// Create new Activity object
			var activity = new Activities ({
				name: workout.tasks[parindex].name,
				reps: workout.tasks[parindex].reps[index],
				sets: workout.tasks[parindex].sets[index],
				weight: workout.tasks[parindex].weights[index],
				baseLift: workout.tasks[parindex].baseLift,
				task: workout.tasks[parindex]._id,
				workout: workout._id
			});

			// Redirect after save
			activity.$save(function(response) {
				//$location.path('activities/' + response._id);
				$scope.status.tasks[parindex].sets[index] = 'complete';
				//$scope.status = 'kyle';
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

		/*$scope.calcWeight = function(baseLift, percent) {
			$scope.workoutplan = Workoutplans.get({ 
				workoutplanId: '56153637974a3e882c29c639'
			});
		};*/

	}
	]);
//.directive('taskForm', function(taskReps, taskWeight, taskBaselift) {
//  return {
//    template: 'Name: {{customer.name}} Address: {{taskBaselift}}'
//  };
//});