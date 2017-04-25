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
        

        	//let baseUrl = serviceConstants.baseUrl;
        	$http.get(`${baseUrl}/reports/view/customers/role`)
            .then(function success(response) {
                if(response.data !== null) {
                   console.log("response : ");
                   console.log(response.data);
                   vm.serviceRole = response.data.data;
                   vm.headersRole= response.data.headers;
                }
            }, function error(error) {
                console.log(error);
            });
        
        	$http.get(`${baseUrl}/reports/view/customers/organization`)
            .then(function success(response) {
                if(response.data !== null) {
                   console.log("response : ");
                   console.log(response.data);
                   vm.serviceOrganization = response.data.data;
                   vm.headersOrganization= response.data.headers;
                }
            }, function error(error) {
                console.log(error);
            });
        	$http.get(`${baseUrl}/reports/view/customers/ngo`)
            .then(function success(response) {
                if(response.data !== null) {
                   console.log("response : ");
                   console.log(response.data);
                   vm.serviceNgo = response.data.data;
                   vm.headersNgo= response.data.headers;
                }
            }, function error(error) {
                console.log(error);
            });
        	$http.get(`${baseUrl}/reports/view/NGO`)
            .then(function success(response) {
                if(response.data !== null) {
                   console.log("response : ");
                   console.log(response.data);
                   vm.serviceGetAllNGO = response.data.data;
                   vm.headersGetAllNGO = response.data.headers;
                }
            }, function error(error) {
                console.log(error);
            });
            
        	
        	$http.get(`${baseUrl}/reports/view/getAllVolunteers`)
            .then(function success(response) {
                if(response.data !== null) {
                   console.log("response : ");
                   console.log(response.data);
                   vm.serviceVolunteer = response.data.data;
                   vm.headersVolunteer= response.data.headers;
                }
            }, function error(error) {  
                console.log(error);
            });
}
	
})();