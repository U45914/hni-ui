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
	
	clientTabController.inject = ['$q','ngoEnrollmentService','$scope','$rootScope','$state'];
	
	function clientTabController($q,ngoEnrollmentService,$scope,$rootScope,$state){
    	var vm = this;
    	vm.client = ngoEnrollmentService.clientData;
    	    	
    	vm.save = function(){   		
      		 var data = {
      				 "individualsServedDaily" : vm.client.individualsServedDaily,
      				 "individualsServedMonthly" : vm.client.individualsServedMonthly,
      				 "individualsServedAnnually" : vm.client.individualsServedAnnually,
      				 "individualClientInfoCollected" : vm.client.individualClientInfoCollected,
      				 "storeClientInfo" : vm.client.storeClientInfo,
      				 "unshelteredClientPercentage": vm.client.unshelteredClientPercentage,
      				 "employeedClientPercentage" : vm.client.employeedClientPercentage
      		 };
      		 ngoEnrollmentService.setClientData(data);
			 var serviceCalls = ngoEnrollmentService.savePartial();
	  		 $q.all(serviceCalls)//.then(onSuccess,onError);
			 
      		
    	}
	}
})();