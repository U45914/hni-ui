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
		
		let vm = this;
		$window.scrollTo(0, 0);
		var providerDetailsPath = "provider/all";
		vm.showsMenu = false;

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
		
		gridService.getGridDataFor(providerDetailsPath).then(function(response){
			vm.providers = response.data.data;
		});
		
		vm.showMenu = function(){
			vm.showsMenu = true;
			providerService.getMenusForProvider(vm.provider).then(function(response){
				vm.gridOptions.data = response.data;
			});
		
			
		}	
		
		vm.viewMenuItems = function(ev, row){
			$mdDialog.show({
				controller : 'menuItemManagementController',
				controllerAs : 'mimc',
				templateUrl : 'menuItemManagement.tpl.html',
				parent : angular.element(document.body),
				targetEvent : ev,
				clickOutsideToClose : true,
				escapeToClose : true,
				fullscreen : $scope.customFullscreen,
				locals : {
					menuId : row.entity.id,
					menuName : row.entity.name
				}
			}).then(function(answer) {
				console.log(answer);
			});
		}

	}
})();