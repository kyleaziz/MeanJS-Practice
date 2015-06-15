'use strict';

// Configuring the Articles module
angular.module('workoutplans').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Workoutplans', 'workoutplans', 'dropdown', '/workoutplans(/create)?');
		Menus.addSubMenuItem('topbar', 'workoutplans', 'List Workoutplans', 'workoutplans');
		Menus.addSubMenuItem('topbar', 'workoutplans', 'New Workoutplan', 'workoutplans/create');
	}
]);