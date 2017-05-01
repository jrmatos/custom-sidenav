(function () {
	'use strict';
	var myApp = angular
		.module('sidenav-component', 
			[
				'ngMaterial',
				'ngAnimate',
				'sidenav-component',
				'ui.router'
			]);


	myApp.config(function($stateProvider, $qProvider) {
		var helloState = {
			name: 'hello',
			url: '/hello',
			template: '<h3>hello world!</h3>'
		}

		var aboutState = {
			name: 'about',
			url: '/about',
			template: '<h3>Its the UI-Router hello world app!</h3>'
		}

		$stateProvider.state(helloState);
		$stateProvider.state(aboutState);

		 $qProvider.errorOnUnhandledRejections(false);
	});
})();