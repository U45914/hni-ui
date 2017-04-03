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
    NgoInvitationController.$inject = ['$scope'];
    
    function NgoInvitationController($scope){
    	var vm = this;
    	alert("dfd");
    	console.log("inside ngo invitation controller");
    	
    }
    })();