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
	
	clientTabController.inject = ['$q','ngoEnrollmentService','$scope','$rootScope','$state','toastService','validateService'];
	
	function clientTabController($q,ngoEnrollmentService,$scope,$rootScope,$state,toastService,validateService){
    	var vm = this;
    	
    	 
    	$scope.$on("data-loaded-ngo", function(obj) {
			vm.load();
		});
    	
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
    	
    	vm.load = function() {
    		vm.client = ngoEnrollmentService.clientData;
    	}
    	  vm.enrollementData = function(){
        	  var data = {}; 
        	  data.overviewData = ngoEnrollmentService.getOverviewData();
        	  data.stakeHolderData = ngoEnrollmentService.getStakeHolderData();
        	  data.serviceData = ngoEnrollmentService.getServiceData();
        	  data.fundingData = ngoEnrollmentService.getFundingData();
        	  data.clientData = ngoEnrollmentService.getClientData();
        	  vm.validateNGOEnrollmentData = validateService.validateNGOEnrollmentData(data);
        	  console.log(vm.validateNGOEnrollmentData);
        	  if(angular.equals(vm.validateNGOEnrollmentData, {})){
    	    	  console.log( vm.validateNGOEnrollmentData);
    	    	  console.log("Attempting function call..");
    	    	  var serviceCalls = ngoEnrollmentService.postNgoEnrollData().then(
    	    			  				function successCallback(response) {
    	    			  					if (response && response.status && response.statusText == "OK") {
    	    			  						toastService.showToast("Your request has been submitted")
    	    			  							$state.go('dashboard');
    	    			  					} else {
    	    			  						toastService.showToast("Failed : "+ response.data.errorMsg);
    	    			  					}
    	    			  				},
    	    			  				function errorCallback(response) {
    	    			  					toastService.showToast("Something went wrong, please try again")
    	    			  					// $state.go('dashboard');
    	    			  				});
    		  return $q.all(serviceCalls);
        	  }
    		  
    	  }
    	
	}
})();