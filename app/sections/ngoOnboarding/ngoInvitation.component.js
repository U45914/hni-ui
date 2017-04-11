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
    NgoInvitationController.$inject = ['$q','ngoOnboardingService','$scope'];
    
    function NgoInvitationController($q,ngoOnboardingService,$scope){
    	var vm = this;
    	vm.submit = function(){   		
    		 var data = {"name" :  vm.name, 
    				 	 "phone " : vm.phoneNumber,
    				 	 "email ": vm.email,
    				 	 "website ": vm.webSiteUrl,
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
   	   				 var serviceCalls = ngoOnboardingService.postNgo(data);
   	   				 console.log(data);
   	   				 return $q.all(serviceCalls);
    			   	}
    			} 
    	
    		}
    	
    })();