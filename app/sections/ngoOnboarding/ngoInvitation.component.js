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
    		 var data = {"orgName" :  vm.name,"phoneNumber " : vm.phoneNumber,"email ": vm.email,"webSiteUrl ": vm.webSiteUrl};
    		 //console.log("data : "+data.orgName);
   	   			 if(vm.name!=null && vm.phoneNumber!=null && vm.email!=null && vm.webSiteUrl !=null){
   	   				 var serviceCalls = ngoOnboardingService.postNgo(data);
   	   				 return $q.all(serviceCalls);
    			   	}
    			} 
    	
    		}
    	
    })();