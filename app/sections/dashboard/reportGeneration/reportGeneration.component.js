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
        vm.showNothing=false;
        vm.showData=true;
 
        	$http.get(`${baseUrl}/reports/view/`+vm.report.reportPath)
            .then(function success(response) {
                if(response.data !== null) {
                   console.log("response : ");
                   console.log(response.data);
            
                   vm.service = response.data.data;
                   if(vm.service.length==0)
                	   {
                	   vm.showNothing=true;
                	   vm.showData=false;
                	   }
           
                   console.log(vm.service);
                   vm.headers= response.data.headers;
                }
                if(response.data == null){
                	console.log("Missing Data");
                }
            }, function error(error) {
                console.log(error);
            });
        	
     
}
	
})();

