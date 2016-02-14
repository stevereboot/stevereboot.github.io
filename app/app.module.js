// ./app/app.module.js

// Define main angular module
var app = angular.module('appModule',
	[
		'ui.router',
		'appStates',
		'mainController',
		'navController',
		'errorController',
		'curriculumController',
		'curriculumDirective',
		'curriculumService'
	]
);