(function() {
    angular
        .module('app')
        .component('actionsSection', {
            bindings: {},
            templateUrl: 'actions-section.tpl.html',
            controller: ActionSectionController,
            controllerAs: 'vm'
        });

    ActionSectionController.$inject = ['$scope', '$http', '$state', 'userService', 'serviceConstants'];

    function ActionSectionController($scope, $http, $state, userService, serviceConstants) {
    	let baseUrl = serviceConstants.baseUrl;
        var vm = this;
         
   	 	vm.service = [];
   	 	vm.headers= [];
   	 	vm.reportCollection = [];
        
        vm.$onInit = function() {
        	let baseUrl = serviceConstants.baseUrl;
        	$http.get(`${baseUrl}/users/services`)
            .then(function success(response) {
            	
                if(response.data !== null) {
                	vm.userRole = response.data.role;
                	vm.user = response.data.data;  
                	if (response.data.profileStatus == true) {
                		vm.user = response.data.data;                		
                	} else {
                		window.localStorage.setItem("userRole", vm.userRole);
                		$state.go("profile");
                	}
                }
            }, function error(error) {
                console.log(error);
            });
        	
        	$http.get(`${baseUrl}/users/reports`)
            .then(function success(response) {
                if(response.data !== null) {
                   vm.reportCollection = response.data.data;
                }
            }, function error(error) {
                console.log(error);
            });
        	
        };
    }
})();