(function(){
	angular.module('app').component('menuManagement',{
		bindings : {

		},
		templateUrl : 'menuManagement.tpl.html',
		controller : menuManagementController,
		controllerAs : 'vm'
	});
	
	menuManagementController.$inject = ['$scope', '$mdDialog', '$window', 'gridService', 'providerService', 'toastService'];
	
	function menuManagementController($scope, $mdDialog, $window, gridService, providerService, toastService) {
		
		$window.scrollTo(0, 0);
		let vm = this;
		var providerDetailsPath = "provider/all";
		vm.showsMenu = false;
		vm.showMenuItems = false;
		vm.deleteButton = true;
		vm.deleteButtonItems = true;

		vm.goBack = function(){
			$window.history.back();
		}
		
		vm.gridOptions = {
                urlSync: false,
                appScopeProvider: this,
                columnDefs:[ { name:'name'},
                             { name:'startHourAvailable'},
                             { name:'endHourAvailable'},
                             {
         	        			field: "name",
         	        			displayName: "",
         	        			editable:false,
         	        			enableFiltering: false,
         	        			pinnedRight:true,
         	        			cellTemplate: '<md-button ng-click="grid.appScope.viewMenuItems($event, row)" class="md-raised button-primary md-button md-ink-ripple">View Menu Items</md-button>',
         	        			height: 100,
         	        			width : 130
                             }
                             ],
                data : [],
                enableFiltering: true,
                multiSelect: true,
                enableSelectAll: true,
                paginationPageSizes: [25, 50, 100],
                paginationPageSize: 50
       }
		
		vm.gridOptionsItems = {
                urlSync: false,
                appScopeProvider: this,
                columnDefs:[],
                data : [],
                enableFiltering: true,
                multiSelect: true,
                enableSelectAll: true,
                paginationPageSizes: [25, 50, 100],
                paginationPageSize: 50
       }
		
		vm.loadMenu = function(){
			gridService.getGridDataFor(providerDetailsPath).then(function(response){
				vm.providers = response.data.data;
			});
		}
		vm.loadMenu();
		vm.showMenu = function(){
			vm.showsMenu = true;
			vm.showMenuItems = false;
			providerService.getMenusForProvider(vm.provider).then(function(response){
				vm.gridOptions.data = response.data;
			});
		
			
		}	
		
		
		vm.createNewMenu = function(ev) {
			// open a popup and show menu management window
			vm.showCreateMenu = true;
			vm.pid = vm.provider;
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
					providerId : vm.provider 
				}
			// Only for -xs, -sm breakpoints.
			}).then(function(menu) {
				// load menu items drop down
				vm.providerLocation.menu = menu;
				vm.selectedMenu = menu.id;
				vm.providerMenusList.push(menu);
			});

		}
		
		vm.viewMenuItems = function(ev, row){
			$window.scrollTo(0, 800);
			vm.showMenuItems = true;
			vm.menuName = row.entity.name;
			vm.menuId = row.entity.id;
			vm.loadMenuItems(vm.menuId);
		}
		
		vm.loadMenuItems = function(menuId){
			providerService.getMenuItems(menuId).then(function(response){
				vm.gridOptionsItems.data = response.data.data;
				vm.gridOptionsItems.columnDefs = response.data.headers;
				vm.appendDeleteOptionToColumns();
			});
		}
		
		vm.gridOptions.onRegisterApi = function(gridApi){
       	 vm.gridApi = gridApi;
       	 gridApi.selection.on.rowSelectionChanged($scope,function(row){
                	vm.selectedRows = gridApi.selection.getSelectedRows();
                	if(vm.selectedRows.length>0){
                		vm.deleteButton = false;
                	} else {
                		vm.deleteButton = true;
                	}
            });
       	 gridApi.selection.on.rowSelectionChangedBatch($scope,function(row){
       		 angular.forEach(rows, function(row){
        			
        			if (row.isSelected) {
        				vm.selectedRows.push(row);
        			} else {
        				vm.selectedRows = [];
        			}
        		});
       	 });
		}
		
		vm.saveMenu = function(){
			var dirtyRows = vm.gridApi.rowEdit.getDirtyRows();
			var updatedRows = [];
			var payload = {};
			vm.showMenuItems = false;
			
			if(dirtyRows.length>0){
				for(var index=0; index < dirtyRows.length; index++){
					var dirtyRow = dirtyRows[index].entity;
					payload = {
							"id" : dirtyRow.id,
							"name" : dirtyRow.name,
							"startHourAvailable" : dirtyRow.startHourAvailable,
							"endHourAvailable" : dirtyRow.endHourAvailable 
					};
					updatedRows.push(payload);
				}
				providerService.updateMenu(updatedRows).then(function(response){
					toastService.showToast(response.data.message);
					vm.gridApi.core.refresh();
				});
			} else {
				toastService.showToast("No data change!");
			}
			
			$window.scrollTo(0, 0);
		}
		
		vm.deleteMenu = function(){
			vm.showMenuItems = false;
			if(vm.selectedRows.length > 0){
				var menuList = [];
				for(var index=0; index < vm.selectedRows.length; index++){
					menuList.push(vm.selectedRows[index].id);
				}
				providerService.deleteMenuList(menuList).then(function(response){
					toastService.showToast(response.data.message);
				});
			} else {
				toastService.showToast("Please select the menu for deletion.");
			}
		}
		vm.gridOptionsItems.onRegisterApi = function(gridApiItems){
	       	 vm.gridApiItems = gridApiItems;
	       	 gridApiItems.selection.on.rowSelectionChanged($scope,function(row){
	                	vm.selectedRowsItems = gridApiItems.selection.getSelectedRows();
	                	if(vm.selectedRowsItems.length>0){
	                		vm.deleteButtonItems = false;
	                	} else {
	                		vm.deleteButtonItems = true;
	                	}
	            });
	       	 gridApiItems.selection.on.rowSelectionChangedBatch($scope,function(row){
	       		 angular.forEach(rows, function(row){
	        			
	        			if (row.isSelected) {
	        				vm.selectedRowsItems.push(row);
	        			} else {
	        				vm.selectedRowsItems = [];
	        			}
	        		});
	       	 });
			}
		
		vm.appendDeleteOptionToColumns = function() {
			var removeIcon = {
				field : "name",
				displayName : "",
				editable : false,
				pinnedRight : true,
				cellTemplate : '<md-button ng-click="grid.appScope.deleteMenuItem($event, row)" class="md-raised button-primary md-button md-ink-ripple">Remove</md-button>',
				height : 80
			}
			vm.gridOptionsItems.columnDefs.push(removeIcon);
		}
		
		vm. deleteMenuItem = function(ev, row){
			providerService.deleteMenuItems(row.entity.id).then(function(response){
				if(response.data != null){
					toastService.showToast(response.data.message);
					vm.loadMenuItems(vm.menuId);
				} else {
					toastService.showToast("Deletion Failed.");
				}
			});
			$window.scrollTo(0, 0);
		}
		vm.saveMenuItems = function(){
			var dirtyRows = vm.gridApiItems.rowEdit.getDirtyRows();
			console.log(dirtyRows);
			var updatedRows = [];
			var payload = {};
			var dirtyRow = null;
			
			if(dirtyRows.length>0){
				for(var index=0; index < dirtyRows.length; index++){
					dirtyRow = dirtyRows[index].entity;
					payload = {
							"id" : dirtyRow.id,
							"calories" : dirtyRow.calories,
							"carbs" : dirtyRow.carbs,
							"description" : dirtyRow.description,
							"expires" : dirtyRow.expires,
							"fat" : dirtyRow.fat,
							"name" : dirtyRow.name,
							"price" : dirtyRow.price,
							"protien" : dirtyRow.protien
					};
					updatedRows.push(payload);
					
				}
				providerService.updateMenuItems(vm.menuId,updatedRows).then(function(response){
					toastService.showToast(response.data.message);
					vm.gridApiItems.core.refresh();
					vm.gridApiItems.rowEdit.flushDirtyRows(vm.gridApiItems.rowEdit.getDirtyRows);
					$window.scrollTo(0, 0);
					vm.loadMenuItems(vm.menuId);
				});
			} else {
				toastService.showToast("No data change!");
			}
		}

	}
})();