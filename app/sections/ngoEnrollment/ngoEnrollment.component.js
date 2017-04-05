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
   		 var data = [vm.firstName,vm.lastName,vm.username,vm.password,vm.passwordConfirm];
   		 console.log("datails : "+data);
   		 var serviceCalls = ngoOnboardingService.postNgoLogin(data);
		 return $q.all(serviceCalls);
    	}
    }
    
})();