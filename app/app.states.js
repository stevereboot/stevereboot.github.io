// ./app/app.states.js

var states = angular.module('appStates', []);

// Define States
states.config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('main', {
				url: '',
				templateUrl: 'app/main/main.html'
			})
			.state('curriculum', {
				url: '/curriculum',
				templateUrl: 'app/curriculum/curriculum.html',
				controller: 'curriculum'
			})
			.state('error', {
				params: {
					code: 404,
					desc: 'Not Found'
				},
				templateUrl: 'app/error/error.html',
				controller: 'error',
				resolve: {
					errorParams: function($stateParams) {
						return $stateParams;
					}
				}
			});

		$urlRouterProvider.otherwise(function($injector, $location) {
			var state = $injector.get('$state');
			state.go('error');
		});
	}
]);