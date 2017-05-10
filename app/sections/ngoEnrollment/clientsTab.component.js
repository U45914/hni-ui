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
	
	clientTabController.$inject = ['$q','ngoEnrollmentService','$scope','$rootScope','$state','toastService','validateService'];
	
	function clientTabController($q,ngoEnrollmentService,$scope,$rootScope,$state,toastService,validateService){
    	var vm = this;
    	
    	 
    	$scope.$on("data-loaded-ngo", function(obj) {
			vm.load();
		});
    	
    	vm.save = function(isTopTabClicked){   
    		if(vm.client){
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
    	
    	vm.load = function() {
    		vm.client = ngoEnrollmentService.clientData;
    		ngoEnrollmentService.setClientData(vm.client);
    	}
    	  vm.enrollementData = function(){
        	  var data = {}; 
        	  data.overviewData = ngoEnrollmentService.getOverviewData();
        	  data.stakeHolderData = ngoEnrollmentService.getStakeHolderData();
        	  data.serviceData = ngoEnrollmentService.getServiceData();
        	  data.fundingData = ngoEnrollmentService.getFundingData();
        	  data.clientData = ngoEnrollmentService.getClientData();
        	  
        	  vm.validateErrors = validateService.validateNGOEnrollmentData(data);

        	  debugger;
        	  console.log(vm.validateErrors);
        	  if (vm.validateErrors.length > 0) {
        		  // Now prepare message for user
        		var validationMessage = validateService.getFormattedErrorMessageForUser(vm.validateErrors);
        		toastService.showToastWithFormatting(validationMessage);
        		  
        	  } else {
        		  
    	    	  console.log("Attempting function call..");
    	    	  var serviceCalls = ngoEnrollmentService.postNgoEnrollData().then(
			  				function successCallback(response) {
			  					if (response && response.status && response.statusText == "OK") {
			  						toastService.showToast("Your request has been submitted")
			  							$state.go('dashboard');
			  					} else if(response && response.data && !response.data.errorMsg){
				                	   toastService.showToast("Something went wrong. Try again later");
				                   }
			  					else {
			  						toastService.showToast("Failed : "+ response.data.errorMsg);
			  					}
			  				},
			  				function errorCallback(response) {
			  					toastService.showToast("Something went wrong, please try again")
			  				});
    	    	  return $q.all(serviceCalls);
        	  }
        	  
    		  
    	  }
    	  
    	  $rootScope.$on("tabFocusChangedFromTabFive", function(event, data){  			
  			vm.save(true);
  		})
    	
	}
})();