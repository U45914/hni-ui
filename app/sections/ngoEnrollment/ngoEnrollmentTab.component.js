(function () {
  angular
      .module('app')
      .component('ngoEnrollmentTab',{
          bindings: {

          },
          templateUrl: 'ngoEnrollmentTab.tpl.html',
          controller: ngoEnrollmentTabController,
          controllerAs: 'vm'
  }) ;
  ngoEnrollmentTabController.$inject = ['$q','$rootScope', '$scope','ngoEnrollmentService','$state'];

  function ngoEnrollmentTabController($q,$rootScope, $scope,ngoEnrollmentService,$state) {
      var vm = this;
      vm.tabIndex = 0;
      //ngoEnrollmentService.getProfileData();
      var overViewData = ngoEnrollmentService.overviewData;
	  var stakeHolderData = ngoEnrollmentService.stakeHolderData;
	  var serviceData = ngoEnrollmentService.serviceData;
	  var fundingData = ngoEnrollmentService.fundingData;
	  var clientData = ngoEnrollmentService.clientData;
    
         
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
    	   
		  var serviceCalls = ngoEnrollmentService.postNgoEnrollData().then(
					function successCallback(response) {
						if (response
								&& response.status
								&& response.statusText == "OK") {
							alert("Your request has been submitted")
							$state.go('dashboard');
						} else {
							alert("Failed : "
									+ response.data.errorMsg);
						}
					},
					function errorCallback(response) {
						alert("Something went wrong, please try again")
						// $state.go('dashboard');
					});

		  return $q.all(serviceCalls);
		  
	  }
  }
  
})();
        