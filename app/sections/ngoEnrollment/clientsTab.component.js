(function() {
	angular
		.module('app')
		
		 .directive('clientsTab', clientsDirective)
	
	
	function clientsDirective() {
		return {
			scope : {
				
			},
			restrict : "E",
			templateUrl : "clientsTab.tpl.html",
			controller : clientTabController,
			 controllerAs: 'vm'
		}
	}
	
	clientTabController.inject = ['$q','ngoEnrollmentService','$scope'];
	
	function clientTabController($q,ngoEnrollmentService,$scope){
    	var vm = this;
    	vm.client = ngoEnrollmentService.clientData;
    	    	
    	vm.save = function(){   		
      		 var data = {
      				 "individualsServedDaily" : vm.client.individualsServedDaily,
      				 "individualsServedMonthly" : vm.client.individualsServedMonthly,
      				 "individualsServedAnnually" : vm.client.individualsServedAnnually,
      				 "individualClientInfoCollected" : vm.client.individualClientInfoCollected,
      				 "infoStored" : vm.client.infoStored,
      				 "unshelteredClientPercentage": vm.client.unshelteredClientPercentage,
      				 "employeedClientPercentage" : vm.client.employeedClientPercentage
      		 };
      		 ngoEnrollmentService.clientData = data;
      		var serviceCalls = ngoEnrollmentService.postNgoClientInfo(data);
      		return $q.all(serviceCalls);
      		
    	}
	}
})();