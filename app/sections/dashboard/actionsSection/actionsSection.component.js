(function() {
    angular
        .module('app')
        .component('actionsSection', {
            bindings: {},
            templateUrl: 'actions-section.tpl.html',
            controller: ActionSectionController,
            controllerAs: 'vm'
        });

    ActionSectionController.$inject = ['$rootScope', '$scope', '$http', '$state', 'userService', 'serviceConstants', 'popupService', 'rolesConstantName'];

    function ActionSectionController($rootScope, $scope, $http, $state, userService, serviceConstants, popupService, rolesConstantName) {
    	let baseUrl = serviceConstants.baseUrl;
        var vm = this;
         
   	 	vm.service = [];
   	 	vm.headers= [];
   	 	vm.reportCollection = [];
   	 	
   	 	vm.rolesConstantName = rolesConstantName;
	   	
        vm.$onInit = function() {
        	let baseUrl = serviceConstants.baseUrl;
        	$http.get(`${baseUrl}/users/services`)
            .then(function success(response) {
            	
                if(response.data !== null) {
                	vm.userRole = response.data.role;
                	window.localStorage.setItem("userRole", vm.userRole);
                	vm.user = response.data.data;  
                	if (response.data.profileStatus == true || vm.userRole === "Super Admin") {
                		//popupService.showAlert("Please take few minitues to complete your profile");
                		vm.user = response.data.data;                		
                	} else {
                		popupService.showAlert("Please take few minitues to complete your profile to start")
                		.then(function(){
                			window.localStorage.setItem("userRole", vm.userRole);
                    		$state.go("profile");	
                		});
                		
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
        
        vm.setReportView = function(viewName) {
        	
        }
        vm.showReportView = function(type) {
        	$rootScope.$broadcast('show-report-view', type);
        }
        
    }
})();