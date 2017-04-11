/**
 * 
 */

(function() {
    angular
        .module('app')
        .component('ngoInvitation', {
        	bindings: {

            },
            templateUrl: 'ngoInvitation.tpl.html',
            controller: NgoInvitationController,
            controllerAs: 'vm'
        });
    NgoInvitationController.$inject = ['$q','ngoOnboardingService','$scope', '$state', 'toaster'];
    
    function NgoInvitationController($q,ngoOnboardingService,$scope, $state, toaster){
    	var vm = this;
    	vm.submit = function(){   		
    		 var data = {"name" :  vm.name, 
    				 	 "phone" : vm.phoneNumber,
    				 	 "email": vm.email,
    				 	 "website": vm.webSiteUrl,
    				 	 "logo" : vm.logo,
    				 	  "addresses": [
    				 		    {
    				 		      "name": vm.adminName,
    				 		      "address1": vm.address,
    				 		      "city": vm.city,
    				 		      "state": vm.state,
    				 		      "zip": vm.zip
    				 		    }
    				 		  ]
};
   	   			 if(vm.name!=null && vm.phoneNumber!=null && vm.email!=null && vm.webSiteUrl !=null){
   	   				 var serviceCalls = ngoOnboardingService.postNgo(data)
					 .then(function successCallback(response) {
						 if (response && response.data.response && response.data.response == "success") {
							toaster.success("Your request has submitted, please check your email for more details") 
							$state.go('dashboard');
						 } else {
							 toaster.success("Failed : "+ response.data.errorMsg); 
						 }
					  }, function errorCallback(response) {
						debugger;
						toaster.success("Something went wrong, please try again")
						//$state.go('dashboard'); 
					  });
					 
   	   				 console.log(data);
   	   				 return $q.all(serviceCalls);
    			   	}
    			} 
    	
    		}
    	
    })();