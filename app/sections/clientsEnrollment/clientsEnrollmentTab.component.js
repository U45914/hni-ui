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
  clientsEnrollmentTabController.$inject = ['clientEnrollmentService'];

  function clientsEnrollmentTabController(clientEnrollmentService) {
      var vm = this;
      
      
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
        