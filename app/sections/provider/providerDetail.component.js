(function(){
	angular.module('app').component('providerDetail',{
		bindings : {

		},
		templateUrl : 'providerDetail.tpl.html',
		controller : providerDetailController,
		controllerAs : 'vm'
	});
	
	providerDetailController.$inject = ['$scope', '$http', '$state', 'serviceConstants', 'validateService' , 'providerService', 'toastService'];
	
	function providerDetailController($scope, $http, $state, serviceConstants, validateService, providerService, toastService){
		if($state.params.data == null){
			$state.go('dashboard');
		}
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
		vm.states = validateService.validateStateDrpdwn();
		
		
		//remove this method
		vm.updateSelected = function(){
			var dirtyRows = vm.gridApi.rowEdit.getDirtyRows();
			angular.forEach(dirtyRows, function(row){
    			console.log(row.entity);
    		});
		}
		
		vm.gridOptions.onRegisterApi = function(gridApi){
        	 vm.gridApi = gridApi;
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
		
		providerService.getProviderLocationDetails(providerId).then(function(response){
			console.log(response);
			vm.gridOptions.data = response.data.data;
			vm.gridOptions.columnDefs = response.data.headers;
		});
		
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
			updateProviderLocations(dirtyRows);
			updateProvider(provider);
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
			providerService.updateProvider(provider);
		}
	}
})();