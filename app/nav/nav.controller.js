// ./app/nav/nav.controller.js

var nav = angular.module('navController', []);

nav.controller('nav', ['$scope', '$location',
	function($scope, $location) {
		$scope.nav = {};
		$scope.nav.isActive = function (viewLocation) {
			return viewLocation === $location.path();
		};

	}
]);
