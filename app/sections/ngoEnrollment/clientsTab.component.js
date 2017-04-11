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
    	vm.save = function(){   		
      		 var data = {
      				 "individualsServedDaily" : vm.daily,
      				 "individualsServedMonthly" : vm.monthly,
      				 "individualsServedAnnually" : vm.annually,
      				 "individualClientInfoCollected" : vm.select,
      				 "infoStored" : vm.informationStore,
      				 "unshelteredClientPercentage": vm.unsheltered,
      				 "employeedClientPercentage" : vm.employeed
      		 };
      		var serviceCalls = ngoEnrollmentService.postNgoClientInfo(data);
      		return $q.all(serviceCalls);
      		
    	}
	}
})();