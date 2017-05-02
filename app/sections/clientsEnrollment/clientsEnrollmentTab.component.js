(function () {
  angular
      .module('app')
        .component('clientProfile', {
          bindings: {

          },
          templateUrl: 'clientsEnrollmentTab.tpl.html',
          controller: clientsEnrollmentTabController,
          controllerAs: 'vm'
  }) ;
  clientsEnrollmentTabController.$inject = ['$rootScope', 'clientEnrollmentService','$scope','$timeout'];

  function clientsEnrollmentTabController($rootScope, clientEnrollmentService,$scope,$timeout) {
      var vm = this;
      
     /* vm.$onInit = function() {
    	  var response = clientEnrollmentService.getProfileData();
    	  debugger;
		  console.log(response);
		  clientEnrollmentService.finalData = response;
		  $timeout(function(){
			  $scope.$broadcast("data-loaded-client", response);
		  },2000);*/
		  
      vm.$onInit = function() {
    	  clientEnrollmentService.getProfileData().then(function success(response) {
              if(response || response.data) {
                  var response = response.data.response;
                  clientEnrollmentService.finalData = response;
                  $scope.$broadcast("data-loaded-client", response);
               }
           }, function error(error) {
               console.log(error);
           });;
      }
      
       $rootScope.$on("scroll-tab", function(event, data){
     	 vm.scroll()
      });
       vm.scroll = function(){
     	  if(vm.tabIndex ==  5){
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
