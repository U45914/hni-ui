(function() {
	angular
		.module('app')
		
		 .directive('healthDetailsTab', healthDetailsDirective)
	
	
	function healthDetailsDirective() {
		return {
			scope : {
				
			},
			restrict : "E",
			templateUrl : "healthDetailsTab.tpl.html",
			controller : healthDetailsTabController,
			 controllerAs: 'vm'
		}
	}
	
	healthDetailsTabController.inject = ['$q','clientEnrollmentService'];
	
	function healthDetailsTabController($q,clientEnrollmentService){
    	var vm = this;
    //	vm.health = clientEnrollmentService.clientData;
    	    	
    	vm.save = function(){   		
      		 var data = {
      				 "allergies" : vm.health.allergies,
      				 "addiction" : vm.health.addiction,
      				 "addictionType" : vm.health.addictionType,
      				 "mentalHealthIssue" : vm.health.mentalHealthIssue,
      				 "mentalHealthIssueHistory" : vm.health.mentalHealthIssueHistory,
      				 "height" : vm.health.feet+"|"+vm.health.inch,
      				 "weight": vm.health.weight,
      				 "exercisePerWeek" : vm.health.exercisePerWeek,
      				"lastVisitDoctor" : vm.health.lastVisitDoctor,
      				"lastVisitDentist" : vm.health.lastVisitDentist
      		 };
      		//clientEnrollmentService.setClientData(data);
      		var serviceCalls = clientEnrollmentService.setHealthData(data);
			// var serviceCalls = clientEnrollmentService.savePartial();
	  		 $q.all(serviceCalls)//.then(onSuccess,onError);
			 
      		
    	}
	}
})();