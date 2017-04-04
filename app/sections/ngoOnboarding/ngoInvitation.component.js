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
    			   			 var data = [vm.name,vm.phoneNumber,vm.email,vm.webSiteUrl];
    			   			 if(vm.name!=null && vm.phoneNumber!=null && vm.email!=null && vm.webSiteUrl !=null){
    			   				 var serviceCalls = ngoOnboardingService.postNgo(data);
    			   				 return $q.all(serviceCalls);
    			   			   }
    						}   		 	
    	
    		}
    	
    })();