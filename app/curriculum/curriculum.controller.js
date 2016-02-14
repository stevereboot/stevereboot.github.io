// ./app/curriculum/curriculum.controller.js

var curriculum = angular.module('curriculumController', []);

curriculum.controller('curriculum', ['$scope', '$sce', '$anchorScroll', '$timeout', 'curriculumService',
	function($scope, $sce, $anchorScroll, $timeout, curriculumService) {

		$scope.curriculum = {};

		curriculumService.getHtmlfromMd('app/curriculum/md/', 'curriculum', 'curriculum.gotoAnchor',
			[
				'p00.intro',
			]
			).then(function(data) {
				$scope.curriculum.content = $sce.trustAsHtml(data[0]);
				$scope.curriculum.menu = $sce.trustAsHtml(data[1]);
				
				// When page loads with anchor tab, 
				// jump to that tag
				var id = location.hash.substr(7);
				$timeout(function () {
					$anchorScroll(id);				
				}, 50);
		});

		// Binding for ng-click menu items
		$scope.curriculum.gotoAnchor = function(id) {
			$anchorScroll(id);
		}
	}
]);