'use strict';

// Configuring the Articles module
angular.module('measures').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Measures', 'measures', 'dropdown', '/measures(/create)?');
		Menus.addSubMenuItem('topbar', 'measures', 'Shared Results', 'measures');
    Menus.addSubMenuItem('topbar', 'measures', 'My Testing Results', 'myMeasures');
	}
]);