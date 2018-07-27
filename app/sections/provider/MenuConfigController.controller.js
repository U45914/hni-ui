(function() {
	angular.module('app').controller('MenuConfigController',
			MenuConfigController);

	MenuConfigController.$inject = [ '$scope', '$http', '$state',
			'serviceConstants', 'validateService', 'providerService', "providerId", '$mdDialog' ];

	function MenuConfigController($scope, $http, $state, serviceConstants,
			validateService, providerService, providerId, $mdDialog) {
		let mdcvm = this;

		mdcvm.menu = {};
		mdcvm.menuItem = {};
		mdcvm.showMenuItemConfig = false;
		mdcvm.showCreateButton = true;
		mdcvm.menuItems = [];
		mdcvm.providerId= providerId;
		mdcvm.menuItemsGridOptions = {
				data : [],
				urlSync : false,
				columnDefs : [],
				multiSelect : true,
				enableSelectAll : true,
				paginationPageSizes : [ 25, 50, 100 ],
				paginationPageSize : 50,
				appScopeProvider : this
		};

		mdcvm.menuItemsGridOptions.onRegisterApi = function(gridApi) {
			mdcvm.gridApi = gridApi;
		}
		
		
		mdcvm.createMenu = function() {
			if (mdcvm.validateMenu()){
				providerService.createNewMenu(providerId,mdcvm.menu).then(function(response){
					if (response) {
						mdcvm.showMenuItemConfig = true;
						mdcvm.menuId = response.data.id;
						mdcvm.menu = response.data;
						mdcvm.showCreateButton = false;
					}
				});
			}
		}
		
		mdcvm.validateMenu = function() {
			if (mdcvm.menu.name == null || mdcvm.menu.name.length == 0) {
				alert("Please provide value for Menu Name");
				return false;
			} 
			
			return true;
		}
		
		mdcvm.validateMenuItem = function() {
			if (mdcvm.menuItem.name == null || mdcvm.menuItem.name.length == 0) {
				alert("Please provide value for Menu Item Name");
				return false;
			} 
			if (mdcvm.menuItem.description == null || mdcvm.menuItem.description.length == 0) {
				alert("Please provide description for Menu Item");
				return false;
			}      
			
			if (mdcvm.menuItem.price == null) {
				alert("Please provide Menu Item Price");
				return false;
			} 
			if (mdcvm.menuItem.expires == null) {
				alert("Please set Menu Item Expiry (days)");
				return false;
			} 
			if (mdcvm.menuItem.calories == null) {
				alert("Please provide calory value of item");
				return false;
			} 
			if (mdcvm.menuItem.protien == null) {
				alert("Please provide protien value Menu Item");
				return false;
			} 
			if (mdcvm.menuItem.fat == null) {
				alert("Please provide fat value for Menu Item");
				return false;
			} 
			if (mdcvm.menuItem.carbs == null) {
				alert("Please provide carb value for Menu Item");
				return false;
			} 
			return true;
		}
		
		mdcvm.createMenuItem = function() {
			if (mdcvm.validateMenuItem()) {
				providerService.createNewMenuItem(mdcvm.menu.id, mdcvm.menuItem).then(function(response){
					if (response) {
						mdcvm.menuItem = {};
						mdcvm.loadMenuItemGrid();
					}
				});
			}
		}
		
		mdcvm.loadMenuItemGrid = function() {
			providerService.getMenuItems(mdcvm.menuId).then(function(response){
				mdcvm.menuItemsGridOptions.data = response.data.data;
				mdcvm.menuItemsGridOptions.columnDefs = response.data.headers;
				mdcvm.appendDeleteOptionToColumns();
				mdcvm.menuItems = response.data.data;
				mdcvm.reloadMenuItemsGrid();
			});
		}
		
		mdcvm.appendDeleteOptionToColumns = function() {
			var removeIcon = {
				field : "name",
				displayName : "",
				editable : false,
				pinnedRight : true,
				cellTemplate : '<md-button ng-click="grid.appScope.removeMenuItem($event, row)" class="md-raised button-primary md-button md-ink-ripple">Remove</md-button>',
				height : 80
			}
			mdcvm.menuItemsGridOptions.columnDefs.push(removeIcon);
		}

		mdcvm.reloadMenuItemsGrid = function() {
			if (mdcvm.gridApi != null) {
				mdcvm.gridApi.core.refresh();
			}
		}
		
		mdcvm.removeMenuItem = function(event, row) {
			
		}
		mdcvm.completeMenuAssignment = function() {
			if (mdcvm.menuItems.length > 0) {
				mdcvm.menu.menuItems = mdcvm.menuItems;
				$mdDialog.hide(mdcvm.menu)
			} else {
				alert("Please create atleast one menu item");
			}
		}
		
	}
})();