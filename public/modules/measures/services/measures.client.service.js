'use strict';

//Measures service used to communicate Measures REST endpoints
angular.module('measures')
.factory('Measures', ['$resource',
	function($resource) {
		return $resource('measures/:measureId', { measureId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
])
.factory('MyMeasures', ['$resource',
  function($resource) {
    return $resource('myMeasures');
  }
]);