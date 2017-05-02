(function () {
	'use strict';
	var app = angular
		.module('app', 
			[
				'custom-sidenav',
				'ui.router'
			]);

	app.config(function($stateProvider, $qProvider) {
		
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

		var bob = {
			name: 'bob',
			url: '/bob',
			template: '<h3>Spongebob!</h3>'
		}

		$stateProvider.state(helloState);
		$stateProvider.state(aboutState);
		$stateProvider.state(bob);

		$qProvider.errorOnUnhandledRejections(false);
	});

	app.controller('HomeCtrl', function () {
		var vm = this;

		vm.sidenavOptions = {
			menuTitleText: 'The Menu Title',
			menuTitleArrowIcon: {
				left: 'menu_title_arrow_left.svg',
				right: 'menu_title_arrow_right.svg'
			},
			iconsPackageUrl: 'src/assets/img',
			clickOutsideToClose: true,
			onNavigateToStateError: function () {
				console.error('Something wrong happened!');
			},
			items: [
				{
					label: 'Upload',
					itemIcon: 'shape.svg',
					state: 'authenticated.home.sheet-upload',
				},
				{
					label: 'Cts Material',
					itemIcon: 'analytics.svg',
					menu: {
						items: [
							{
								label: 'Produto Acabado',
								state: 'authenticated.home.ctsmaterial',
							},
							{
								label: 'Item',
								state: 'authenticated.home.ctsMaterialItem',
							}
						]
					}
				},
				{
					label: 'Logistic Tool',
					itemIcon: 'globe.svg',
					menu: {
						items: [
							{
								label: 'Despesas Logísticas',
								state: 'authenticated.home.expense-list',
							},
							{
								label: 'Relatórios',
								state: 'authenticated.home.reembolso',
								menu: {
									items: [
										{
											label: 'Custo Mensal',
											state: 'authenticated.home.costsbymonth',
										}
									]
								}
							}
						]
					}
				}			    
			]
		}; 
		// sidenavOptions
	})
})();