'use strict';

//Setting up route
angular.module('userstats').config(['$stateProvider',
	function($stateProvider) {
		// Userstats state routing
		$stateProvider.
		state('listUserstats', {
			url: '/userstats',
			templateUrl: 'modules/userstats/views/list-userstats.client.view.html'
		}).
		state('createUserstat', {
			url: '/userstats/create',
			templateUrl: 'modules/userstats/views/create-userstat.client.view.html'
		}).
		state('viewUserstat', {
			url: '/userstats/:userstatId',
			templateUrl: 'modules/userstats/views/view-userstat.client.view.html'
		}).
		state('editUserstat', {
			url: '/userstats/:userstatId/edit',
			templateUrl: 'modules/userstats/views/edit-userstat.client.view.html'
		});
	}
]);