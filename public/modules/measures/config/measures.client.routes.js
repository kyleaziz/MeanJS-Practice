'use strict';

//Setting up route
angular.module('measures').config(['$stateProvider',
	function($stateProvider) {
		// Measures state routing
		$stateProvider.
		state('listMeasures', {
			url: '/measures',
			templateUrl: 'modules/measures/views/list-measures.client.view.html'
		}).
		state('listMyMeasures', {
			url: '/myMeasures',
			templateUrl: 'modules/measures/views/list-my-measures.client.view.html'
		}).
		state('createMeasure', {
			url: '/measures/create',
			templateUrl: 'modules/measures/views/create-measure.client.view.html'
		}).
		state('viewMeasure', {
			url: '/measures/:measureId',
			templateUrl: 'modules/measures/views/view-measure.client.view.html'
		});
	}
]);