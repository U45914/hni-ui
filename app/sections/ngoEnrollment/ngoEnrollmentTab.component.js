(function () {
  angular
      .module('app')
      .component('ngoProfile',{
          bindings: {

          },
          templateUrl: 'ngoEnrollmentTab.tpl.html',
          controller: ngoEnrollmentTabController,
          controllerAs: 'vm'
  }) ;
  ngoEnrollmentTabController.$inject = ['$q','$rootScope', '$scope','ngoEnrollmentService', 'validateService', '$state','toastService'];

  function ngoEnrollmentTabController($q,$rootScope, $scope,ngoEnrollmentService,validateService,$state, toastService) {
      var vm = this;
      
      vm.tabIndex = 0;
      vm.validateNGOEnrollmentData = "";
      vm.$onInit = function() {
    	  ngoEnrollmentService.getProfileData().then(function success(response) {
              if(response || response.data) {
                  var response = response.data.response;
                  ngoEnrollmentService.overviewData = response.overview;
                  ngoEnrollmentService.stakeHolderData = response.stakeHolder;
                  ngoEnrollmentService.serviceData = response.service;
                  ngoEnrollmentService.fundingData = response.funding;
                  ngoEnrollmentService.clientData = response.client;
                  $scope.$broadcast("data-loaded-ngo", response);
               }
           }, function error(error) {
               console.log(error);
           });;
      }
      var overViewData = ngoEnrollmentService.getOverviewData();
	  var stakeHolderData = ngoEnrollmentService.getStakeHolderData();
	  var serviceData = ngoEnrollmentService.getServiceData();
	  var fundingData = ngoEnrollmentService.getFundingData();
	  var clientData = ngoEnrollmentService.getClientData();
    
     $rootScope.$on("scroll-tab", function(event, data){
    	 vm.scroll()
     });
      vm.scroll = function(){
    	  if(vm.tabIndex ==  4){
    		  vm.tabIndex = 0;
    	  }
    	  else{
    	  ++vm.tabIndex 
    	  }
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
	    			  						 if(response.data.errorMsg == null)
	    			  							response.data.errorMsg = "Internal Error";
	    			  						toastService.showToast("Failed : "+ response.data.errorMsg);
	    			  					}
	    			  				},
	    			  				function errorCallback(response) {
	    			  					toastService.showToast("Something went wrong, please try again")
	    			  					// $state.go('dashboard');
	    			  				});
		  return $q.all(serviceCalls);
    	  }
    	  else{
    		  toastService.showToast("Please fill required fields");
    	  }
		  
	  }
  }
  
})();
        