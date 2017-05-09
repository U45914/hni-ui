(function() {
	angular
		.module('app')
		
		 .directive('connectionDetails', connectionDetailsDirective)
	
	
	function connectionDetailsDirective() {
		return {
			scope : {
				
			},
			restrict : "E",
			templateUrl : "connectionDetails.tpl.html",
			controller : connectionDetailsController,
			 controllerAs: 'vm'
		}
	}
	
	connectionDetailsController.$inject = ['$q','clientEnrollmentService','$scope','$rootScope','$state'];
	
	function connectionDetailsController($q,clientEnrollmentService,$scope,$rootScope,$state){
    	var vm = this;
    	//vm.connection = clientEnrollmentService.connectionDetails;
    	 $scope.$on("data-loaded-client", function(obj) {
 			vm.load();
 	 });
 	  
 	  vm.load = function() {
 			vm.connection = clientEnrollmentService.finalData;
 			clientEnrollmentService.setConnectionData(vm.getDataModel(vm.connection));
 		}
    	
    	vm.save = function(){ 
    		var data = vm.getDataModel(vm.connection);
    	 clientEnrollmentService.setConnectionData(data);
    	$rootScope.$broadcast("scroll-tab", [ 1, 2 ]);
		var serviceCalls = clientEnrollmentService.savePartial();
    	}
    	
    	vm.getDataModel = function(connection){
    		var data = {
        		    "hasSmartPhone": vm.connection.hasSmartPhone,
        		    "serviceProvider": vm.connection.serviceProvider,
        		    "model": vm.connection.model,
        		    "haveMonthlyPlan": vm.connection.haveMonthlyPlan,
        		    "monthlyPlanMinute": vm.connection.monthlyPlanMinute,
        		    "monthlyPlanData": vm.connection.monthlyPlanData,
        		    "monthlyPlanCost": vm.connection.monthlyPlanCost,
        		    "altMonthlyPlan": vm.connection.altMonthlyPlan,
        		    "altMonthlyPlanTogether": vm.connection.altMonthlyPlanTogether
        			};
    		
  		  return data;
    	}
	}
})();