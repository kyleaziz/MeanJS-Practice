'use strict';

//Userstats service used to communicate Userstats REST endpoints
angular.module('userstats')
.factory('Userstats', ['$resource',
	function($resource) {
		return $resource('userstats/:userstatId', { userstatId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
])
.factory('MyUserstats', ['$resource',
  function($resource) {
    return $resource('myUserstats');
  }
])
.factory('MonthUserstats', ['$resource',
  function($resource) {
    return $resource('monthUserstats');
  }
]);