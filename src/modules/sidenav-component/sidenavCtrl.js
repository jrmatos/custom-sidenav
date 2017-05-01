(function () {
	'use strict';

	angular
		.module('sidenav-component')
		.controller('SidenavCtrl', SidenavCtrl);

	// Injecting Denpendencies

	SidenavCtrl.$inject = ['$mdSidenav', '$state', '$mdBottomSheet', '$mdToast', '$rootScope', '$scope', '$timeout'];

	/*
	* recommend
	* Using function declarations
	* and bindable members up top.
	*/

	function SidenavCtrl($mdSidenav, $state, $mdBottomSheet, $mdToast, $rootScope, $scope, $timeout) {
		/*jshint validthis: true */
		var vm = this;		

		// vm.changeMenuItemColor = changeMenuItemColor;
		// vm.resetMenuItemColor = resetMenuItemColor;

		vm.canOpenMenu = true;

		// vm.state = angular.copy($state.current.name);

		// vm.toggleSidenav = function (menuId) {
		// 	$mdSidenav(menuId).toggle();
		// };

		// vm.closeSidenav = function() {
		// 	$rootScope.isLockedMenu = false;
		// 	localStorage.setItem('isLockedMenu', 'false');
		// };

		// // Close menu on small screen after click on menu item.
		// // Only use $scope in controllerAs when necessary; for example, publishing and subscribing events using $emit, $broadcast, $on or $watch.
		// $scope.$on('$stateChangeSuccess', vm.closeSidenav);

		// vm.menu = MenuService.listMenu();

		// vm.admin = [
		// 	{
		// 		link: 'showListBottomSheet($event)',
		// 		title: 'Settings',
		// 		icon: 'settings'
		// 	}
		// ];

		// vm.showSettingsBottom = function ($event) {
		// 	vm.alert = '';
		// 	$mdBottomSheet.show({
		// 		template: '<md-bottom-sheet class="md-grid" layout="column" ng-cloak><div layout="row" layout-align="center center"><h4>With clickOutsideToClose option, drag down or press ESC to close</h4></div><md-list flex layout="row" layout-align="center center"><md-list-item ng-repeat="item in vm.items"><md-button class="md-grid-item-content" ng-click="vm.listItemClick($index)"><md-icon class="md-48">{{item.icon}}</md-icon><div class="md-grid-text"> {{ item.name }} </div></md-button></md-list-item></md-list></md-bottom-sheet>',
		// 		controller: 'SettingsCtrl',
		// 		controllerAs: 'vm',
		// 		targetEvent: $event
		// 	}).then(function (clickedItem) {
		// 		$mdToast.show(
		// 			$mdToast.simple()
		// 			.content(clickedItem.name + ' clicked!')
		// 			.position('top right')
		// 			.hideDelay(2000)
		// 		);
		// 	});
		// };

		// function changeMenuItemColor(){
		// 	vm.menuItemColor = {"background-color": "#f75569"}
		// }

		// function resetMenuItemColor(){
		// 	vm.menuItemColor = {}
		// }


		// /*
		// * This function is used for finding sub items and select them with a border in their parent.
		// * It also removes this border for those ones who are not selected anymore
		// */
		// var checkSelectedChildren = (function _f() {
		// 	$timeout(function () {
		// 		// remove blue border from any eventual selected parent with submenu
		// 		if(DOMHelper('.has-submenu-selected')) {
		// 			DOMHelper('.has-submenu-selected').removeClass('has-submenu-selected');
		// 		}

		// 		// add border to any eventual parent who has menu
		// 		if(document.querySelector('.submenu-selected')) {
		// 			document.querySelector('.submenu-selected').parentNode.parentNode.previousElementSibling.classList.add('has-submenu-selected');
		// 		}

		// 		if(document.querySelector('.submenu2-selected')) {
		// 			document.querySelector('.submenu2-selected').parentNode.parentNode.parentNode.previousElementSibling.classList.add('has-submenu-selected');
		// 		}
		// 	}, 50);
		// 	return _f;
		// })();

		// $rootScope.$on('closeMenuBroadcast', function () {
		// 	if(!vm.canOpenMenu && DOMHelper('md-sidenav').hasClass('sidenav-opened')) {
		// 		vm.sideMenu.collapseChildren(vm.sideMenu.items);
		// 		DOMHelper('md-sidenav').removeClass('sidenav-opened');
		// 		vm.canOpenMenu = true;
		// 	}
		// });

		vm.btnMenuClick = function(){
			// close menu
			if(!vm.canOpenMenu && DOMHelper('md-sidenav').hasClass('sidenav-opened')) {
				vm.sideMenu.collapseChildren(vm.sideMenu.items);
				DOMHelper('md-sidenav').removeClass('sidenav-opened');
				vm.canOpenMenu = true;
			}
			// open menu
			else if(vm.canOpenMenu && !DOMHelper('md-sidenav').hasClass('sidenav-opened')) {
				DOMHelper('md-sidenav').addClass('sidenav-opened');
				$timeout(function () {
					vm.canOpenMenu = false;
				}, 10);
			}
		};

		// $rootScope.$on('$stateChangeStart', function(e, toState) {
		// 	vm.state = toState.name;
		// 	checkSelectedChildren();
		// });

		// $rootScope.$on('$stateChangeError', function () {
		// 	CustomToastService.show('Você está offline. Algumas funcionalidades podem não funcionar normalmente',
		// 			'top right', 5000);
		// });

		// // side menu object
		vm.sideMenu = {
			collapseToggle: function (node) {
				var self = this;

				if(vm.canOpenMenu) vm.btnMenuClick();

				if(node.menu && !node.expanded) {
					node.expanded = true;
				}
				else {
					node.expanded = false;
					if(node.menu) {
						self.collapseChildren(node.menu.items);
					}
				}
			},
			collapseChildren: function (items) {
				var self = this;

				if(items.length) {
					items.forEach(function (value) {
						value.expanded = false;
						if(value.menu) {
							self.collapseChildren(value.menu.items);
						}
					});
				}
			},
			navigateTo: function (page) {

				// check if it's already the page we're trying to navigate to
				if($state.current.name !== page) {
					$state.go(page);
				}

				// remove class if it exists
				if(!vm.canOpenMenu && DOMHelper('md-sidenav').hasClass('sidenav-opened')) {
					DOMHelper('md-sidenav').removeClass('sidenav-opened');
					$timeout(function() {
						vm.sideMenu.collapseChildren(vm.sideMenu.items);
					}, 100);
					vm.canOpenMenu = true;
				}

			},
			items: [
				{
					label: 'Upload',
					itemIcon: 'shape.svg',
					state: 'hello',
					click: function (object) {
						vm.sideMenu.navigateTo(this.state);
					}
				},
				{
					label: 'Cts Material',
					itemIcon: 'analytics.svg',
					click: function (item) {
						vm.sideMenu.collapseToggle(item);
					},
					menu: {
						items: [
							{
								label: 'Produto Acabado',
								state: 'about',
								click: function (object) {
									vm.sideMenu.navigateTo(this.state);
								}
							},
							{
								label: 'Item',
								state: 'about',
								click: function (object) {
									vm.sideMenu.navigateTo(this.state);
								}
							},
							{
								label: 'Processo e Confirmação',
								state: 'about',
								click: function (object) {
									vm.sideMenu.navigateTo(this.state);
								}
							},
							{
								label: 'Critical Parts',
								state: 'about',
								click: function (object) {
									vm.sideMenu.navigateTo(this.state);
								}
							}
						]
					}
				},
				{
					label: 'Supply demand',
					itemIcon: 'productdev.svg',
					state: 'about',
					click: function (object) {
						vm.sideMenu.navigateTo(this.state);
					}
				},
				{
					label: 'Indicadores',
					itemIcon: 'c-h-a-r-t-copy.svg',
					click: function (item) {
                        vm.sideMenu.collapseToggle(item);
                    },
					menu: {
						items: [
							{
								label: 'Atualização',
								state: 'about',
								click: function (object) {
									vm.sideMenu.navigateTo(this.state);
								}
							},
							{
								label: 'Relatorio',
								state: 'about',
								click: function (object) {
									vm.sideMenu.navigateTo(this.state);
								}
							},
						]
					}
				},
				{
					label: 'Logistic Tool',
					itemIcon: 'globe.svg',
					click: function (item) {
                        vm.sideMenu.collapseToggle(item);
					},
					menu: {
						items: [
							{
								label: 'Despesas Logísticas',
								state: 'about',
								click: function (object) {
									vm.sideMenu.navigateTo(this.state);
								}
							},
							{
								label: 'Tabela Siscomex',
								state: 'about',
								click: function (object) {
									vm.sideMenu.navigateTo(this.state);
								}
							},
							{
								label: 'Capatazia',
								state: 'about',
								click: function (object) {
									vm.sideMenu.navigateTo(this.state);
								}
							},
							{
								label: 'Agente de Carga',
								state: 'about',
								click: function (object) {
									vm.sideMenu.navigateTo(this.state);
								}
							},
							{
								label: 'Pagamentos EADI',
								state: 'about',
								click: function (object) {
									vm.sideMenu.navigateTo(this.state);
								}
							},
							{
								label: 'Reembolso',
								state: 'about',
								click: function (object) {
									vm.sideMenu.navigateTo(this.state);
								}
							},
							{
								label: 'Relatórios',
								state: 'about',
								click: function (item) {
									vm.sideMenu.collapseToggle(item);
								},
								menu: {
									items: [
										{
											label: 'Custo Mensal',
											state: 'about',
											click: function (object) {
												vm.sideMenu.navigateTo(this.state);
											}
										},
										{
											label: 'Parameterization',
											state: 'about',
											click: function (object) {
												vm.sideMenu.navigateTo(this.state);
											}
										},
										{
											label: 'Storage Time',
											state: 'about',
											click: function (object) {
												vm.sideMenu.navigateTo(this.state);
											}
										},
										{
											label: 'Process By Freight',
											state: 'about',
											click: function (object) {
												vm.sideMenu.navigateTo(this.state);
											}
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
                    state: 'about',
                    click: function (object) {
                        vm.sideMenu.navigateTo(this.state);
                    }
                },
                {
                    label: 'E&O',
                    itemIcon: 'analytics.svg',
                    click: function (item) {
                        vm.sideMenu.collapseToggle(item);
                    },
                    menu: {
                        items: [
                            {
                                label: 'Controle de E&O',
                                state: 'about',
                                click: function (object) {
                                    vm.sideMenu.navigateTo(this.state);
                                }
                            },
                            {
                                label: 'Pareto',
                                state: 'about',
                                click: function (object) {
                                    vm.sideMenu.navigateTo(this.state);
                                }
                            },
                            {
                                label: 'Improvement Plan',
                                state: 'about',
                                click: function (object) {
                                    vm.sideMenu.navigateTo(this.state);
                                }
                            },
                            {
                                label: 'Relatórios',
                                state: 'about',
                                click: function (item) {
                                    vm.sideMenu.collapseToggle(item);
                                },
                                menu: {
                                    items: [
                                        {
                                            label: 'Relatório 4Q',
                                            state: 'about',
                                            click: function (object) {
                                                vm.sideMenu.navigateTo(this.state);
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                }
			]
		};

		// $mdSidenav('left').onClose(function () {
		// 	vm.sideMenu.collapseChildren(vm.sideMenu.items);
		// });

	}
})();
