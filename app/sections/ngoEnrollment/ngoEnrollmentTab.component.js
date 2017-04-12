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
//  ngoEnrollmentTabController.$inject=['$q','ngoEnrollmentService']; 
  
  /*function ngoEnrollmentTabController($q,ngoEnrollmentService) {
	  var vm = this;
	  
	  vm.enrollementData = function(){  
		  alert("entered");
		  var overViewData = ngoEnrollmentService.overviewData;
		  var stakeHolderData = ngoEnrollmentService.postData;
		  var serviceData = ngoEnrollmentService.serviceData;
		  var fundingData = ngoEnrollmentService.fundingData;
		  var clientData = ngoEnrollmentService.clientData;
		  
		  var data = {
				 "overview" 	: overViewData,
		  		 "stakeHolder" 	: stakeHolderData,
		  		 "service"		: serviceData,
		  		 "funding"		: fundingData,
		  		 "client"		: clientData	  
		  };
		  var serviceCalls = ngoEnrollmentService.postNgoEnrollData(data);
		  return $q.all(serviceCalls);
		  //console.log("In Controller");
		  //console.log(serviceCalls);
		  
	  }
  }
  */
  ngoEnrollmentTabController.$inject = ['$q','$rootScope', '$scope','ngoEnrollmentService'];

  function ngoEnrollmentTabController($q,$rootScope, $scope,ngoEnrollmentService) {
      var vm = this;
      vm.tabIndex = 0;
      
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
		  alert("entered");
		  var overViewData = ngoEnrollmentService.overviewData;
		  var stakeHolderData = ngoEnrollmentService.postData;
		  var serviceData = ngoEnrollmentService.serviceData;
		  var fundingData = ngoEnrollmentService.fundingData;
		  var clientData = ngoEnrollmentService.clientData;
		  
		  var data = {
				 "overview" 	: overViewData,
		  		 "stakeHolder" 	: stakeHolderData,
		  		 "service"		: serviceData,
		  		 "funding"		: fundingData,
		  		 "client"		: clientData	  
		  };
		  var serviceCalls = ngoEnrollmentService.postNgoEnrollData(data);
		  return $q.all(serviceCalls);
		  //console.log("In Controller");
		  //console.log(serviceCalls);
		  
	  }
  }
  
})();
        