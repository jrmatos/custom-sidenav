(function () {
	'use strict';
	var myApp = angular
		.module('app', 
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

	myApp.controller('HomeCtrl', function () {
		var vm = this;
		vm.casa = 'branca';

		vm.sidenavOptions = {
			menuTitleText: 'The Menu Title',
			menuTitleArrow: {
				left: 'menu_title_arrow_left.svg',
				right: 'menu_title_arrow_right.svg'
			},
			onMenuOpen: function () {
				alert('onMenuOpen');
			},
			onMenuClose: function () {
				alert('onMenuClose');
			},
			iconsPackageUrl: 'src/assets/img',
			items: [
				{
					label: 'Upload',
					itemIcon: 'shape.svg',
					state: 'hello'
				},
				{
					label: 'Cts Material',
					itemIcon: 'analytics.svg',
					menu: {
						items: [
							{
								label: 'Produto Acabado',
								state: 'jovem'
							},
							{
								label: 'Item',
								state: 'jovem'
							},
							{
								label: 'Processo e Confirmação',
								state: 'jovem'
							},
							{
								label: 'Critical Parts',
								state: 'jovem'
							}
						]
					}
				},
				{
					label: 'Supply demand',
					itemIcon: 'productdev.svg',
					state: 'bob'
				},
				{
					label: 'Indicadores',
					itemIcon: 'c-h-a-r-t-copy.svg',
					menu: {
						items: [
							{
								label: 'Atualização',
								state: 'jovem'
							},
							{
								label: 'Relatorio',
								state: 'jovem'
							},
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
								state: 'jovem'
							},
							{
								label: 'Tabela Siscomex',
								state: 'jovem'
							},
							{
								label: 'Capatazia',
								state: 'jovem'
							},
							{
								label: 'Agente de Carga',
								state: 'jovem'
							},
							{
								label: 'Pagamentos EADI',
								state: 'jovem'
							},
							{
								label: 'Reembolso',
								state: 'jovem'
							},
							{
								label: 'Relatórios',
								state: 'jovem',
								menu: {
									items: [
										{
											label: 'Custo Mensal',
											state: 'jovem'
										},
										{
											label: 'Parameterization',
											state: 'jovem'
										},
										{
											label: 'Storage Time',
											state: 'jovem'
										},
										{
											label: 'Process By Freight',
											state: 'jovem'
										}
									]
								}
							}
						]
					}
				},
                {
                    label: 'Macro Execution',
                    itemIcon: 'macro-menu.svg',
                    state: 'bob'
                },
                {
                    label: 'E&O',
                    itemIcon: 'analytics.svg',
                    menu: {
                        items: [
                            {
                                label: 'Controle de E&O',
                                state: 'jovem'
                            },
                            {
                                label: 'Pareto',
                                state: 'jovem'
                            },
                            {
                                label: 'Improvement Plan',
                                state: 'jovem'
                            },
                            {
                                label: 'Relatórios',
                                state: 'jovem',
                                menu: {
                                    items: [
                                        {
                                            label: 'Relatório 4Q',
                                            state: 'jovem'
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }
			]
		}; // sidenavOptions
	})
})();