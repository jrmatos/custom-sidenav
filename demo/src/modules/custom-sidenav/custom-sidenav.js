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
                options: '='
            },
            controller: SidenavCtrl,
            controllerAs: 'vm'
        };
    }

    SidenavCtrl.$inject = ['$attrs', '$state', '$rootScope', '$scope', '$timeout'];


    function SidenavCtrl($attrs, $state, $rootScope, $scope, $timeout) {
        var vm = this;

        vm.canOpenMenu = true;
        vm.options = $scope.options || {};
        vm.options.iconsPackageUrl += '/';
        vm.state = angular.copy($state.current.name);
        vm.expandedNodes = [];

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
            }, 500);
            return _f;
        })();

        var openMenu = function () {
            if(vm.canOpenMenu && !DOMHelper('md-sidenav').hasClass('sidenav-opened')) {
                DOMHelper('md-sidenav').addClass('sidenav-opened');
                $timeout(function () {
                    vm.canOpenMenu = false;
                }, 10);
                // here the nodes from session are expanded
                vm.sideMenu.expandNodes(vm.sideMenu.items);
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
                // here we look up the selected node in expandedNodes from session
                var expandedNodes = JSON.parse(sessionStorage.getItem("expandedNodes"));
                var foundNode = expandedNodes && expandedNodes.filter(function (item) {
                        return item.id === node.id;
                    });

                // if menu is close... we open it
                if(vm.canOpenMenu) {
                    vm.toggleMenu();
                } else if(foundNode !== null && foundNode.length){ // if the selectedNode is found, we expand/retract it
                    node.expanded = !node.expanded;
                }

                // if we don't find the selected node we don't need to proceed, because we did the job previously
				// at line 108 'node.expanded = !node.expanded'
                if(foundNode === null || !foundNode.length){
                    if(node.menu && !node.expanded) {
                        node.expanded = true;
                    }
                    else {
                        node.expanded = false;
                        if(node.menu) {
                            self.collapseChildren(node.menu.items);
                        }
                    }
                }
            },
            navigateToState: function (newState) {
            	//first of all, we need to clear the variable in session
                sessionStorage.removeItem("expandedNodes");
                // we have also to clear the local expandedNodes
                vm.expandedNodes = [];

                // here we look up the selected node by the state
                this.lookupNodeByState(vm.sideMenu.items, newState);

                // The selected node [vm.expandedNodes[0]0 will be passed to this method, so we can find
				// its parent
                this.lookupParent(vm.sideMenu.items, vm.expandedNodes[0]);
                vm.expandedNodes.reverse();

                // Now we can save the expandedNodes in sessionStorage
                sessionStorage.setItem("expandedNodes", JSON.stringify(vm.expandedNodes));

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
            lookupNodeByState: function(items, newState){
                var self = this;
                if(items.length){
                    items.forEach(function(value){
                        if(value.state === newState){
                        	// if we find the state, we push it to the local expandedNodes variable
                            vm.expandedNodes.push(value);
                        }
                        if(value.menu){
                            self.lookupNodeByState(value.menu.items, newState);
                        }
                    });
                }
            },
            lookupParent: function(items, foundNode){
                var self = this;
                if(items.length){
                    items.forEach(function(value){
                    	// here we lookup if the current id is equal to the parentId of the foundNode
                        if(value.id && value.id === foundNode.parentId){
                            vm.expandedNodes.push(value);
                            // we have to check if the current value has a parent too [eg.: if the menu has a 3rd level]
                            self.lookupParent(vm.sideMenu.items, value);
                        }
                        if(value.menu){
                            self.lookupParent(value.menu.items, foundNode);
                        }
                    })
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
            expandNodes: function (items) {
                var expandedNodes = JSON.parse(sessionStorage.getItem("expandedNodes"));
                var self = this;
                items.forEach(function (value) {
                    for(var node in expandedNodes){
                        if (value.id && (value.id === expandedNodes[node].id)){
                            value.expanded = true;
                            break;
                        }
                    }
                    if(value.menu) {
                        self.expandNodes(value.menu.items);
                    }
                });
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