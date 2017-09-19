(function(){
	angular.module('app').component('providerDetail',{
		bindings : {

		},
		templateUrl : 'providerDetail.tpl.html',
		controller : providerDetailController,
		controllerAs : 'vm'
	});
	
	providerDetailController.$inject = ['$scope', '$http', '$state', '$window', 'serviceConstants', 'validateService' , 'providerService', 'toastService'];
	
	function providerDetailController($scope, $http, $state, $window,  serviceConstants, validateService, providerService, toastService){
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
		loadGrid(providerId);
		vm.states = validateService.validateStateDrpdwn();
		vm.disableActivate = true;
		vm.activeText = "Active/Not Active";
		
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
			});
		}
		
		vm.update = function(){
			var dirtyRows = vm.gridApi.rowEdit.getDirtyRows();
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
			updateProviderLocations(dirtyRows, provider);
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
		
		function updateProviderLocations(dirtyRows, provider){
			var updatedRows = [];
			angular.forEach(dirtyRows, function(row){
				updatedRows.push(row.entity);
    		});
			providerService.updateProviderLocations(updatedRows).then(function(response){
				if(response.data.response == "success"){
					updateProvider(provider);
				}else{
					toastService.showToast(response.data.message);
				}
			});
		}
		
		function updateProvider(provider){
			providerService.updateProvider(provider).then(function(response){
				toastService.showToast(response.data.message);
			});
		}
	}
})();