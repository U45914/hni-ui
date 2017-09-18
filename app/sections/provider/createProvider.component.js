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
			'$window', 'toastService' ];

	function NewProviderController($scope, $http, $state, serviceConstants,
			validateService, providerService, $window, toastService) {
		var vm = this;
		vm.isAllowedToCreate = true;
		vm.isAllowedToUpdate = false;
		vm.provider = {}
		vm.showProviderLocationFields = false;
		vm.providerLocations = [];
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
			console.log(row);
			providerService.deleteProviderLocation(row.entity.provider.id, row.entity.id).then(function(){
				vm.refreshProviderLocations();
			});
		}
		// Load states to drop down
		vm.states = validateService.validateStateDrpdwn();
	}
})();