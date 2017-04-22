(function () {
  angular
      .module('app')
      .component('clientsEnrollmentTab',{
          bindings: {

          },
          templateUrl: 'clientsEnrollmentTab.tpl.html',
          controller: clientsEnrollmentTabController,
          controllerAs: 'vm'
  }) ;
  clientsEnrollmentTabController.$inject = ['$rootScope', 'clientEnrollmentService'];

  function clientsEnrollmentTabController($rootScope, clientEnrollmentService) {
      var vm = this;
      
      
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
    	   
		  var serviceCalls = clientEnrollmentService.postClientInfo()/*.then(
					function successCallback(response) {
						if (response
								&& response.data.response
								&& response.data.response == "success") {
							alert("Your request has been submitted")
							$state.go('login');
						} else {
							alert("Failed : "
									+ response.data.errorMsg);
						}
					},
					function errorCallback(response) {
						alert("Something went wrong, please try again")
						// $state.go('dashboard');
					});

	console.log(data);
*/
		  //return $q.all(serviceCalls);
		  
	  }

  }
  
})();
        