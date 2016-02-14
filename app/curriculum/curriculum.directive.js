// ./app/curriculum/curriculum.directive.js

var curriculum = angular.module('curriculumDirective', []);

// Menu has ng-click directives, so must be explicitly compiled
curriculum.directive('compileTemplate', ['$compile', '$parse',
	function($compile, $parse) {
		return {
			restrict: 'A',
			replace: true,
			link: function(scope, element, attr) {
				var parsed = $parse(attr.ngBindHtml);

				function getStringValue() { return (parsed(scope) || '').toString(); }

				scope.$watch(getStringValue, function() {
					$compile(element, null, -9999)(scope);
				});
			}
		};
	}
]);
