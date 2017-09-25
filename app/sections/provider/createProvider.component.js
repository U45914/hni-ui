(function() {
	angular.module('app').component('newProvider', {
		bindings : {

		},
		templateUrl : 'provider_new.tpl.html',
		controller : NewProviderController,
		controllerAs : 'vm'
	});

	NewProviderController.$inject = [ '$scope', '$http', '$state',
			'serviceConstants', 'validateService', 'providerService',
			'$window', 'toastService', '$mdDialog' ];

	function NewProviderController($scope, $http, $state, serviceConstants,
			validateService, providerService, $window, toastService, $mdDialog) {
		var vm = this;
		vm.isAllowedToCreate = true;
		vm.isAllowedToUpdate = false;
		vm.provider = {}
		vm.showProviderLocationFields = false;
		vm.providerLocations = [];
		vm.providerLocation = {};
		vm.providerLocation.menu = {};
		vm.selectedMenu = null;
		vm.providerMenusList = [];
		vm.providerGridOptions = {
			data : [],
			urlSync : false,
			columnDefs : [],
			multiSelect : true,
			enableSelectAll : true,
			paginationPageSizes : [ 25, 50, 100 ],
			paginationPageSize : 50,
			appScopeProvider : this
		};

		vm.providerGridOptions.onRegisterApi = function(gridApi) {
			vm.gridApi = gridApi;
		}

		vm.createProvider = function() {
			if (vm.provider.name != null) {

				providerService
						.registerProvider(vm.provider)
						.then(
								function(providerResponse) {
									// Now enable/show provider location fields
									// to the
									// user to populate
									if (providerResponse) {
										toastService
												.showToast("Provider created sucessfully")
										vm.isAllowedToCreate = false;
										vm.isAllowedToUpdate = true;
										vm.showProviderLocationFields = true;
										vm.provider = providerResponse.data;
										$window.scrollTo(50, 300);
									}
								});
			}
		}

		vm.updateProvider = function() {
			if (vm.provider.name != null) {

				providerService.updateProvider(vm.provider).then(
						function(providerResponse) {
							// Now enable/show provider location fields to the
							// user to populate
							vm.isAllowedToCreate = false;
							vm.isAllowedToUpdate = true;
							vm.showProviderLocationFields = true;
							vm.provider = providerResponse.data.data;
						});
			}
		}

		vm.addProviderLocation = function() {
			providerService.addProviderLocation(vm.provider.id,
					vm.providerLocation).then(function() {
				toastService.showToast("Provider Location added sucessfully")
				vm.refreshProviderLocations();
				vm.providerLocation = {};
				vm.loadMenusForProvider();
			});
		}

		vm.refreshProviderLocations = function() {
			providerService
					.getProviderLocationDetails(vm.provider.id)
					.then(
							function(response) {
								vm.providerGridOptions.data = response.data.data;
								vm.providerGridOptions.columnDefs = response.data.headers;
								vm.appendDeleteOptionToColumns();
								vm.providerLocations = response.data.data;
								vm.reloadProviderLocationGrid();
							});
		}

		vm.reloadProviderLocationGrid = function() {
			if (vm.gridApi != null) {
				vm.gridApi.core.refresh();
			}
		}

		vm.appendDeleteOptionToColumns = function() {
			var removeIcon = {
        			field: "name",
        			displayName: "",
        			editable:false,
        			pinnedRight:true,
        			cellTemplate: '<md-button ng-click="grid.appScope.removeProvider($event, row)" class="md-raised button-primary md-button md-ink-ripple">Remove</md-button>',
        			height: 100
        	}
			vm.providerGridOptions.columnDefs.push(removeIcon);
		}
		
		vm.removeProvider = function(event, row) {
			// write logic for provider locations
			//console.log(row);
			providerService.deleteProviderLocation(row.entity.provider.id,
					row.entity.id).then(function() {
				vm.refreshProviderLocations();
			});
		}

		vm.loadMenusForProvider = function() {
			if (vm.providerMenusList.length == 0) {
				providerService.getMenusForProvider(vm.provider.id).then(
						function(response) {
							if (response) {
								vm.providerMenusList = response.data;
							}
						});
			}
		}

		vm.showMenu = function(ev) {
			var menuItem = null;

			for (var i = 0; i < vm.providerMenusList.length; i++) {
				if (vm.selectedMenu == vm.providerMenusList[i].id) {
					menuItem = vm.providerMenusList[i];
				}
			}

			vm.showMenuItemPopup(menuItem, ev);
		}

		vm.showMenuItemPopup = function(menuItem, ev) {
			$mdDialog.show({
				controller : 'MenuViewController',
				controllerAs : 'mvc',
				templateUrl : 'menu_view.tpl.html',
				parent : angular.element(document.body),
				targetEvent : ev,
				clickOutsideToClose : true,
				escapeToClose : true,
				fullscreen : $scope.customFullscreen,
				locals : {
					menu : menuItem
				}
			}).then(function(answer) {
				console.log(answer);
			});
		}
		vm.createNewMenu = function(ev) {
			// open a popup and show menu management window

			$mdDialog.show({
				controller : 'MenuConfigController',
				controllerAs : 'mdcvm',
				templateUrl : 'menu_config.tpl.html',
				parent : angular.element(document.body),
				targetEvent : ev,
				clickOutsideToClose : false,
				escapeToClose : true,
				fullscreen : $scope.customFullscreen,
				locals : {
					providerId : vm.provider.id
				}
			// Only for -xs, -sm breakpoints.
			}).then(function(menu) {
				// load menu items drop down
				vm.providerLocation.menu = menu;
				vm.selectedMenu = menu.id;
				vm.providerMenusList.push(menu);
			});

		}
		// Load states to drop down
		vm.states = validateService.validateStateDrpdwn();
	}
})();