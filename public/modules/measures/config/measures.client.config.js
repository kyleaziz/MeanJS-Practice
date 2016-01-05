'use strict';

// Configuring the Articles module
angular.module('measures').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Measures', 'myMeasures', 'item', '/myMeasures');
		//Menus.addSubMenuItem('topbar', 'measures', 'Shared Results', 'measures');
    //Menus.addSubMenuItem('topbar', 'measures', 'My Testing Results', 'myMeasures');
	}
]);