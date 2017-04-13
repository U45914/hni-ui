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
      				 "indServDaily" : vm.client.indServDaily,
      				 "indServMonthly" : vm.client.indServMonthly,
      				 "indServAnnual" : vm.client.indServAnnual,
      				 "clientInfo" : vm.client.clientInfo,
      				 "storeClientInfo" : vm.client.storeClientInfo,
      				 "clientsUnsheltered": vm.client.clientsUnsheltered,
      				 "clientsEmployed" : vm.client.clientsEmployed
      		 };
      		 ngoEnrollmentService.setClientData(data);
			 var serviceCalls = ngoEnrollmentService.savePartial();
	  		 $q.all(serviceCalls)//.then(onSuccess,onError);
			 
      		
    	}
	}
})();