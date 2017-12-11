(function(){
	angular.module('app').component('providerDetail',{
		bindings : {

		},
		templateUrl : 'providerDetail.tpl.html',
		controller : providerDetailController,
		controllerAs : 'vm'
	});
	
	providerDetailController.$inject = ['$scope', '$http', '$state', '$window', 'serviceConstants', 'validateService' , 'providerService', 'toastService', '$mdDialog'];
	
	function providerDetailController($scope, $http, $state, $window,  serviceConstants, validateService, providerService, toastService, $mdDialog){
		if($state.params.data == null){
			$state.go('dashboard');
		}
		$window.scrollTo(0, 0);
		var providerId = $state.params.data.providerId;
		var vm = this;
		let baseUrl = serviceConstants.baseUrl;
		vm.gridOptions = {
       		 data: [],
                urlSync: false,
                columnDefs:[],
                enableFiltering: true,
                multiSelect: true,
                enableSelectAll: true,
                paginationPageSizes: [25, 50, 100],
                paginationPageSize: 50,
                appScopeProvider: this
       }
		providerService.getMenusForProvider(providerId).then(function(response){
			vm.menus = response.data;
		});
		loadGrid(providerId);
		vm.states = validateService.validateStateDrpdwn();
		vm.disableActivate = true;
		vm.activeText = "Active/Not Active";
		vm.providerLocations = [];
		vm.providerLocation = {};
		vm.providerLocation.menu = {};
		vm.selectedMenu = null;
		vm.providerMenusList = [];
		
		vm.addProviderLocation = function() {
			vm.providerLocation.menu = vm.selectedMenu;
			providerService.addProviderLocation(providerId,
					vm.providerLocation).then(function() {
				$window.scrollTo(0, 0);
				toastService.showToast("Provider Location added sucessfully");
				loadGrid(providerId);
				vm.providerLocation = {};
				vm.selectedMenu=null;
			});
		}
		
		vm.goBack = function(){
			$window.history.back();
		}
		
		vm.gridOptions.onRegisterApi = function(gridApi){
        	 vm.gridApi = gridApi;
        	 gridApi.selection.on.rowSelectionChanged($scope,function(row){
                 vm.selectedRows = gridApi.selection.getSelectedRows();
                 	vm.disableActivate = false;
                 	vm.isActivated = vm.selectedRows[0].isActive;
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
		
		providerService.getProviderDetails(providerId).then(function(response){
			var responseData = response.data;
			vm.providerDetails = responseData;
			vm.providerName = responseData.name;
			vm.providerWebsite = responseData.websiteUrl;
			vm.providerAddressLine1 = responseData.address.address1;
			vm.providerAddressLine2 = responseData.address.address2;
			vm.providerCity = responseData.address.city;
			vm.providerState = responseData.address.state;
			vm.providerZip = responseData.address.zip;
		});
		
		
		function loadGrid(providerId){
			providerService.getProviderLocationDetails(providerId).then(function(response){
				vm.gridOptions.data = response.data.data;
				vm.gridOptions.columnDefs = response.data.headers;
				var deleteButton = {
	        			field: "name",
	        			displayName: "",
	        			editable:false,
	        			pinnedRight:true,
	        			cellTemplate: '<md-button ng-click="grid.appScope.deleteProviderLocation($event, row)" class="md-raised button-primary md-button md-ink-ripple">Delete</md-button>',
	        			height: 100,
	        			width : 100
	        	}
				var menuComboList = {
	        			field: "menu.id",
	        			displayName: "Menu Name",
	        			pinnedRight:true,
	        			editableCellTemplate: 'ui-grid/dropdownEditor',
	        			editDropdownOptionsArray: vm.menus,
	        			editDropdownIdLabel: 'id',
	        			editDropdownValueLabel: 'name',
	        			cellTemplate: '<div ng-bind="grid.appScope.getName($event, row)"></div>',
	        			height: 100,
	        			width : 100
	        	}
	        	vm.gridOptions.columnDefs.push(deleteButton);
				vm.gridOptions.columnDefs.splice(1,1,menuComboList);
			});
		}
		vm.getName = function(ev, row){
			debugger;
			for(var index=0; index<vm.menus.length; index++){
				if(row.entity.menu == null || vm.menus[index]==null ){
					return "";
				}
				if(row.entity.menu.id == vm.menus[index].id){
					return vm.menus[index].name;	
				}
			}
		}
		vm.deleteProviderLocation = function(event, row){
			providerService.deleteProviderLocation(providerId, row.entity.id).then(function(response){
				toastService.showToast(response.data.message);
				loadGrid(providerId)
			});
		}
		
		vm.updateProvider = function(){
			var provider = {
					"id" : vm.providerDetails.id,
					"name" : vm.providerName,
					"websiteUrl" : vm.providerWebsite,
					"address" : {
						"address1" : vm.providerAddressLine1,
						"address2" : vm.providerAddressLine2,
						"city" : vm.providerCity,
						"state" : vm.providerState,
						"zip" : vm.providerZip
					} 
			};
			updateProvider(provider);
			$window.scrollTo(0, 0);
		}
		
		vm.updateProviderLocations = function(){
			var dirtyRows = vm.gridApi.rowEdit.getDirtyRows();
			updateProviderLocations(dirtyRows);
			$window.scrollTo(0, 0);
			
		}
		
		vm.activated = function(){
			if(vm.selectedRows[0] != null){
				if(vm.isActivated){
					providerService.deactivateProviderLocation(vm.selectedRows).then(function(response){
						toastService.showToast(response.data.message);
						loadGrid(providerId);
					});
				}else{
					providerService.activateProviderLocation(vm.selectedRows).then(function(response){
						toastService.showToast(response.data.message);
						loadGrid(providerId);
					});
				}
			}
			$window.scrollTo(0, 0);
			vm.disableActivate = true;
		}
		
		function updateProviderLocations(dirtyRows){
			var updatedRows = [];
			angular.forEach(dirtyRows, function(row){
				updatedRows.push(row.entity);
    		});
			providerService.updateProviderLocations(updatedRows).then(function(response){
					toastService.showToast(response.data.message);
			});
		}
		
		function updateProvider(provider){
			providerService.updateProvider(provider).then(function(response){
				toastService.showToast(response.data.message);
			});
		}
		
		vm.loadMenusForProvider = function() {
			if (vm.providerMenusList.length == 0) {
				providerService.getMenusForProvider(providerId).then(
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
				if (vm.providerMenusList[i] != null && vm.selectedMenu == vm.providerMenusList[i].id) {
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
					providerId : providerId
				}
			// Only for -xs, -sm breakpoints.
			}).then(function(menu) {
				// load menu items drop down
				debugger;
				vm.providerLocation.menu = menu;
				vm.selectedMenu = menu.id;
				vm.providerMenusList.push(menu);
			});

		}
	}
})();