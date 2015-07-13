'use strict';

// Configuring the Articles module
angular.module('userstats').run(['Menus',
  function(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', 'Testing Week', 'userstats', 'dropdown','/userstats');
    Menus.addSubMenuItem('topbar', 'userstats', 'Show Results', 'userstats');
    Menus.addSubMenuItem('topbar', 'userstats', 'My Results', 'myUserstats');

  }
]);