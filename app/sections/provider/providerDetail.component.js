(function(){
	angular.module('app').component('providerDetail',{
		bindings : {

		},
		templateUrl : 'providerDetail.tpl.html',
		controller : providerDetailController,
		controllerAs : 'vm'
	});
	
	providerDetailController.$inject = ['$scope', '$http', '$state', 'serviceConstants', 'validateService'];
	
	function providerDetailController($scope, $http, $state, serviceConstants, validateService){
		var userId = $state.params.data.userId;
		var vm = this;
		let baseUrl = serviceConstants.baseUrl;
		vm.myData = [{name: "Moroni", age: 50},
                    {name: "Tiancum", age: 43},
                    {name: "Jacob", age: 27},
                    {name: "Nephi", age: 29},
                    {name: "Enos", age: 34}];
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
		
		$http.post(`${baseUrl}/configure/provider/details`, userId).then(function(response){
			var responseData = response.data;
			vm.providerName = responseData.name;
			vm.providerWebsite = responseData.websiteUrl;
			vm.providerAddressLine1 = responseData.address.address1;
			vm.providerAddressLine2 = responseData.address.address2;
			vm.providerCity = responseData.address.city;
			vm.providerState = responseData.address.state;
		});
		
		$http.post(`${baseUrl}/configure/provider/locations/`, userId).then(function(response){
			vm.gridOptions.data = response.data.data;
			vm.gridOptions.columnDefs = response.data.headers;
			 
		});
	}
})();