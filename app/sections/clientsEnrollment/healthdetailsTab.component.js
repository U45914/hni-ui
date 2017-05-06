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
	
	healthDetailsTabController.inject = ['$q','clientEnrollmentService','$rootScope','$scope','$state','toastService'];
	
	function healthDetailsTabController($q,clientEnrollmentService,$rootScope,$scope, $state, toastService){
    	var vm = this;
    //	vm.health = clientEnrollmentService.clientData;
    	 $scope.$on("data-loaded-client", function(obj) {
 			vm.load();
 	 });
 	  
 	  vm.load = function() {
 		 vm.health = clientEnrollmentService.finalData;
 			var height = vm.health.height;
 			var height2 = height.toString();
  			vm.health.feet = height2.split('|')[0];
 			vm.health.inch = height2.split('|')[1];
 			clientEnrollmentService.setHealthData(vm.getDataModel(vm.health));
 		}
 	  
    	vm.save = function(){   		
      		 var data = vm.getDataModel(vm.health);
      		
      		var serviceCalls = clientEnrollmentService.setHealthData(data);
      		 //$rootScope.$broadcast("scroll-tab", [ 1, 2 ]);
			 var serviceCalls = clientEnrollmentService.savePartial();
	  		 $q.all(serviceCalls)//.then(onSuccess,onError) 
    	}
    	
    	vm.enrollementData = function(){
       	
    		  var serviceCalls = clientEnrollmentService.postClientInfo().then(
    					function successCallback(response) {
    						if (response
    								&& response.data.response
    								&& response.data.response == "success") {
    							toastService.showToast("Your profile has been saved")
    							$state.go('dashboard');
    						} else if(response && response.data && !response.data.errorMsg){
			                	   toastService.showToast("Something went wrong. Try again later");
			                   } else {
    							toastService.showToast("Failed : "
    									+ response.data.errorMsg);
    						}
    					},
    					function errorCallback(response) {
    						toastService.showToast("Something went wrong, please try again")
    						// $state.go('dashboard');
    					});

    
    		  return $q.all(serviceCalls);
    		  
    	  }
    	
    	vm.getDataModel = function(health){
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
    		return data;
    	}
    	
	}
})();