(function(){
	angular.module('app')
	
	.directive('reportGeneration', reportGenerationDirective)
	
	function reportGenerationDirective() {
		return {
			restrict : "E",
			scope : {
				ds: "=",
			    serviceds : "=",
			    headerds : "="
			},
			templateUrl : "report-generation.tpl.html",
			controller : reportGenerationController,
			controllerAs : "vm"
		}
		
	}
	
	reportGenerationController.$inject= ['$scope','$http','serviceConstants'];
	
	function reportGenerationController($scope, $http, serviceConstants) {
		let baseUrl = serviceConstants.baseUrl;
        var vm = this;
        
        vm.service =     [{ "name": "Rahul" }];
        vm.headers =     [{  "field": "name",  "label": "FirstName" }];
        $scope.serviceds = vm.service;
        $scope.headerds = vm.headers;

        	/*let baseUrl = serviceConstants.baseUrl;
        	$http.get(`${baseUrl}/view/`)
            .then(function success(response) {
                if(response.data !== null) {
                   console.log("response : "+response.data);
                   vm.service = response.data.data;
                   vm.headers= response.data.headers;
                }
            }, function error(error) {
                console.log(error);
            });*/
	
}
	
})();