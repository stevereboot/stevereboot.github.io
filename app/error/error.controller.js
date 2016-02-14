// ./app/error/error.controller.js

var error = angular.module('errorController', []);

error.controller('error', ['$scope', '$http', 'errorParams',
	function($scope, $http, errorParams) {

		$scope.error = {};
		$scope.error.code = errorParams.code;
		$scope.error.desc = errorParams.desc;
	}
]);
