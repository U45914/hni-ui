(function(){
	angular.module('app').component('menuManagement',{
		bindings : {

		},
		templateUrl : 'menuManagement.tpl.html',
		controller : menuManagementController,
		controllerAs : 'vm'
	});
	
	menuManagementController.$inject = ['$scope', '$mdDialog', '$window', 'gridService', 'providerService'];
	
	function menuManagementController($scope, $mdDialog, $window, gridService, providerService) {
		
		$window.scrollTo(0, 0);
		let vm = this;
		var providerDetailsPath = "provider/all";
		vm.showsMenu = false;
		vm.showMenuItems = false;

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
		
		vm.viewMenuItems = function(ev, row){
			$window.scrollTo(0, 800);
			vm.showMenuItems = true;
			vm.menuName = row.entity.name;
			providerService.getMenuItems(row.entity.id).then(function(response){
				vm.gridOptionsItems.data = response.data.data;
				vm.gridOptionsItems.columnDefs = response.data.headers;
			});
		}

	}
})();