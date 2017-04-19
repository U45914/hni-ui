(function(){
	angular
	.module('app')
	.directive('reportGeneration', reportGenerationDirective)// change
	
	function reportGenerationDirective() {
		return {
			restrict : "E",
			scope : {
				ds: "="
			},
			templateUrl : "user-list.tpl.html",
			controller : "reportGenerationController",
			controllerAs : "vm"
		}
		
	}
	
	reportGenerationController.$inject= ['$scope','$http','serviceConstants'];
	
	function reportGenerationController($scope, $http, serviceConstants) {
		let baseUrl = serviceConstants.baseUrl;
        var vm = this;
        
        vm.$onInit = function() {
        	vm.service =     {"data": [ { "name": "Rahul" }  ]};
        	vm.headers =     {"headers": [ {  "field": "name",  "label": "FirstName" }]};

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
}
	
	//$get(`${baseUrl}\report` + vm.report) fu
})();