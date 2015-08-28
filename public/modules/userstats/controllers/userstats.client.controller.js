'use strict';

// Userstats controller
angular.module('userstats').controller('UserstatsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Userstats', 'MyUserstats', 'MonthUserstats',
	function($scope, $stateParams, $location, Authentication, Userstats, MyUserstats, MonthUserstats) {
		$scope.authentication = Authentication;

		// Create new Userstat
		$scope.create = function() {
			// Create new Userstat object
			var userstat = new Userstats ({
				snatchMax: this.snatchMax,
				cleanJerkMax: this.cleanJerkMax,
				backSquatMax: this.backSquatMax,
				benchMax: this.benchMax,
				burpeeMax: this.burpeeMax,
				deadMax: this.deadMax,
				sixLengthTime: this.sixLengthTime,
				kmRow: this.kmRow,
				chinMax: this.chinMax,
				plankTime: this.plankTime,
				lpMileTime: this.lpMileTime,
				boxJumpMax: this.boxJumpMax,
				longJumpMax: this.longJumpMax,
				beepTestScore: this.beepTestScore,
				testWeek: 'September 2015 Test Week'
			});

			// Redirect after save
			userstat.$save(function(response) {
				$location.path('userstats/' + response._id);

				// Clear form fields
				//$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.useAsORM = function(userstat) {
			userstat.user.measures.push(userstat._id);
			userstat.user.$update();
		};

		// Remove existing Userstat
		$scope.remove = function(userstat) {
			if ( userstat ) { 
				userstat.$remove();

				for (var i in $scope.userstats) {
					if ($scope.userstats [i] === userstat) {
						$scope.userstats.splice(i, 1);
					}
				}
			} else {
				$scope.userstat.$remove(function() {
					$location.path('userstats');
				});
			}
		};

		// Update existing Userstat
		$scope.update = function() {
			var userstat = $scope.userstat;

			userstat.$update(function() {
				$location.path('userstats/' + userstat._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Userstats
		$scope.find = function() {
			$scope.userstats = Userstats.query();
		};

		$scope.findMine = function() {
			$scope.userstats = MyUserstats.query();
			//Userstats.findMine($scope.user);
		};

		$scope.findMonth = function() {
			$scope.userstats = MonthUserstats.query();
		};

		// Find existing Userstat
		$scope.findOne = function() {
			$scope.userstat = Userstats.get({ 
				userstatId: $stateParams.userstatId
			});
		};
	}
]);