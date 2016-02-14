// ./app/main/main.controller.js

var main = angular.module('mainController', []);

main.controller('main', ['$scope', '$http',
	function($scope, $http) {
		$scope.name = 'Starter';
	}
]);
