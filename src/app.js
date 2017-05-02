(function () {
	'use strict';
	var app = angular
		.module('app', 
			[
				'sidenav-component',
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
			menuTitleArrow: {
				left: 'menu_title_arrow_left.svg',
				right: 'menu_title_arrow_right.svg'
			},
			iconsPackageUrl: 'src/assets/img',
			onNavigateToStateError: function () {
				console.error('Something wrong happened!');
			},
			items: [
				{
					label: 'Upload',
					itemIcon: 'shape.svg',
					state: 'hello123213'
				},
				{
					label: 'Cts Material',
					itemIcon: 'analytics.svg',
					menu: {
						items: [
							{
								label: 'Produto Acabado',
								state: 'bob'
							},
							{
								label: 'Item',
								state: 'bob'
							},
							{
								label: 'Processo e Confirmação',
								state: 'bob'
							},
							{
								label: 'Critical Parts',
								state: 'bob'
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
								state: 'bob'
							},
							{
								label: 'Relatorio',
								state: 'bob'
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
								state: 'bob'
							},
							{
								label: 'Tabela Siscomex',
								state: 'bob'
							},
							{
								label: 'Capatazia',
								state: 'bob'
							},
							{
								label: 'Agente de Carga',
								state: 'bob'
							},
							{
								label: 'Pagamentos EADI',
								state: 'bob'
							},
							{
								label: 'Reembolso',
								state: 'bob'
							},
							{
								label: 'Relatórios',
								state: 'bob',
								menu: {
									items: [
										{
											label: 'Custo Mensal',
											state: 'bob'
										},
										{
											label: 'Parameterization',
											state: 'bob'
										},
										{
											label: 'Storage Time',
											state: 'bob'
										},
										{
											label: 'Process By Freight',
											state: 'bob'
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
                                state: 'bob'
                            },
                            {
                                label: 'Pareto',
                                state: 'bob'
                            },
                            {
                                label: 'Improvement Plan',
                                state: 'bob'
                            },
                            {
                                label: 'Relatórios',
                                state: 'bob',
                                menu: {
                                    items: [
                                        {
                                            label: 'Relatório 4Q',
                                            state: 'bob'
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