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
                // The difference here is that now we have to define an [id] to a item, in case it has children.
				{
					id: 'cts-material',
					label: 'Cts Material',
					itemIcon: 'analytics.svg',
					menu: {
						items: [
                            // It's child also has to define a [parentId], so we can find it's parent.
							{
								label: 'Produto Acabado',
								state: 'authenticated.home.ctsmaterial',
								parentId: 'cts-material'
							},
							{
								label: 'Item',
								state: 'authenticated.home.ctsMaterialItem',
                                parentId: 'cts-material'
							}
						]
					}
				},
				{
					id: 'logistic_tool',
					label: 'Logistic Tool',
					itemIcon: 'globe.svg',
					menu: {
						items: [
							{
								label: 'Despesas Logísticas',
								state: 'authenticated.home.expense-list',
								parentId: 'logistic_tool'
							},
							{
								id: 'relatorios_logistic',
								label: 'Relatórios',
								state: 'authenticated.home.reembolso',
								parentId: "logistic_tool",
								menu: {
									items: [
										{
											label: 'Custo Mensal',
											state: 'authenticated.home.costsbymonth',
											parentId: 'relatorios_logistic'
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