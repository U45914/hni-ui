(function() {
    angular
        .module('app')
        .component('ngoEnrollment', {
        	bindings: {

            },
            templateUrl: 'ngoEnrollment.tpl.html',
            controller: NgoEnrollmentController,
            controllerAs: 'vm'
        });
    NgoEnrollmentController.$inject = ['$q','ngoOnboardingService','$scope'];
    
    function NgoEnrollmentController($q,ngoOnboardingService,$scope){
    	var vm = this;
    	vm.signIn = function(){   		
   		 var data = {
   				"firstName": vm.firstName,
   				"lastName": vm.lastName,
   				"userName ": vm.username,
   				"password ": vm.password,
   				"confirmedPassword ": vm.passwordConfirm
   				};
   				 //console.log("datails : "+ data.lastName);
   		 var serviceCalls = ngoOnboardingService.postNgoLogin(data);
		 return $q.all(serviceCalls);
    	}
    }
    
})();