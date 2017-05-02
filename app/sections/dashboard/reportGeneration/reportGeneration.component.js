(function(){
	angular.module('app')
	
	.directive('reportGeneration', reportGenerationDirective)
	
	function reportGenerationDirective() {
		return {
			restrict : "E",
			scope : {
				ds: "=ds",
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
        vm.report = $scope.ds;
 
        	$http.get(`${baseUrl}/reports/view/`+vm.report.reportPath)
            .then(function success(response) {
                if(response.data !== null) {
                   console.log("response : ");
                   console.log(response.data);
                   vm.service = response.data.data;
                   vm.headers= response.data.headers;
                }
<<<<<<< Updated upstream
                if(response.data == null){
                	console.log("Missing Data");
                }
=======
>>>>>>> Stashed changes
            }, function error(error) {
                console.log(error);
            });
        	
     
}
	
})();

