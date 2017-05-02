(function () {
	'use strict';

	var sidenavComponent = angular.module('custom-sidenav', ['ngMaterial','ngAnimate']);

	sidenavComponent.directive('customSidenav', sideNavDirective);

	function sideNavDirective(){
		return {  
			restrict: 'E',
			templateUrl: function(elem, attrs) {
				return attrs.templateUrl || 'custom-sidenav.html'
			},
			scope: {
				options: '=',
			},
			controller: SidenavCtrl,
			controllerAs: 'vm'
		};
	}

	SidenavCtrl.$inject = ['$attrs', '$state', '$rootScope', '$scope', '$timeout'];

	
	function SidenavCtrl($attrs, $state, $rootScope, $scope, $timeout) {
		var vm = this;		

		vm.canOpenMenu = true;
		vm.allStates = [];
		vm.options = $scope.options || {};
		vm.options.iconsPackageUrl += '/';
		vm.state = angular.copy($state.current.name);

		/*
		* This function is used for finding sub items and select them with a border in their parent.
		* It also removes this border for those ones who are not selected anymore
		*/
		var checkSelectedChildren = (function _f() {
			$timeout(function () {
				// remove blue border from any eventual selected parent with submenu
				if(DOMHelper('.has-submenu-selected')) {
					DOMHelper('.has-submenu-selected').removeClass('has-submenu-selected');
				}

				// add border to any eventual parent who has menu
				if(document.querySelector('.submenu-selected')) {
					document.querySelector('.submenu-selected').parentNode.parentNode.previousElementSibling.classList.add('has-submenu-selected');
				}

				if(document.querySelector('.submenu2-selected')) {
					document.querySelector('.submenu2-selected').parentNode.parentNode.parentNode.previousElementSibling.classList.add('has-submenu-selected');
				}
			}, 50);
			return _f;
		})();

		var openMenu = function () {
			if(vm.canOpenMenu && !DOMHelper('md-sidenav').hasClass('sidenav-opened')) {
				DOMHelper('md-sidenav').addClass('sidenav-opened');
				$timeout(function () {
					vm.canOpenMenu = false;
				}, 10);
				return true;
			}
			return false;
		}

		var closeMenu = function () {
			if(!vm.canOpenMenu && DOMHelper('md-sidenav').hasClass('sidenav-opened')) {
				vm.sideMenu.collapseChildren(vm.sideMenu.items);
				DOMHelper('md-sidenav').removeClass('sidenav-opened');
				vm.canOpenMenu = true;
				return true;
			}
			return false
		}

		vm.toggleMenu = function(){
			if(!closeMenu()) {
				openMenu();
			}
		};
		
		$rootScope.$on('$stateChangeStart', function(e, toState) {
			vm.state = toState.name;
			checkSelectedChildren();
		});

		$rootScope.$on('closeMenuBroadcast', closeMenu);
		$rootScope.$on('openMenuBroadcast', openMenu);

		// // side menu object
		vm.sideMenu = {			
			collapseToggle: function (node) {
				var self = this;
				if(vm.canOpenMenu) vm.toggleMenu();
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
			navigateToState: function (newState) {
				// check if it's really a new state
				if($state.current.name !== newState) {
					try{
						$state.go(newState);
					}
					catch(e) {
						vm.options.onNavigateToStateError(e);
					}
				}
				closeMenu();
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
			bindNavigateToStateClick: function () {
				vm.sideMenu.navigateToState(this.state);
			},
			bindCollapseToggleClick: function () {
				vm.sideMenu.collapseToggle(this);
			},
			mapItemsWithClick: function (item) {
				if(item.menu) {
					item.click = vm.sideMenu.bindCollapseToggleClick;
					item.menu.items = item.menu.items.map(vm.sideMenu.mapItemsWithClick);
				}
				else {
					item.click = vm.sideMenu.bindNavigateToStateClick;
					vm.allStates.push(item.state);
				}
				return item;
			},
			items: []
		};

		vm.sideMenu.items = vm.options.items.map(vm.sideMenu.mapItemsWithClick);

		if(vm.options.clickOutsideToClose) {
			document.querySelector('custom-sidenav').nextElementSibling.addEventListener('click', function () {
				closeMenu();
				$scope.$apply();
			});
		}

	}

})();