(function () {
	'use strict';

	angular.module('sidenav-component').directive('customSidenav', sideNavDirective);

	function sideNavDirective(){
		return {  
			restrict: 'E',
			templateUrl: 'src/modules/sidenav-component/sidenav.html',
			link: function (scope, element, attrs) {
			}
		};
	}
})();