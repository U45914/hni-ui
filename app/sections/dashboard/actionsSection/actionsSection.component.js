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
   	 	
   	 	vm.isFirstCardActive = false;
   	 	vm.isSecondTabActive = false;
   	 	vm.isThirdTabActive = false;
   		vm.isFourthTabActive = false;
   		vm.isOrderActive = false;
   		vm.isReportActive = false;
   	 	
   	 	
   	 	vm.rolesConstantName = rolesConstantName;
	   	
        vm.$onInit = function() {
        	let baseUrl = serviceConstants.baseUrl;
        	$http.get(`${baseUrl}/users/services`)
            .then(function success(response) {
            	
                if(response.data !== null) {
                	vm.userRole = response.data.role;
                	if(vm.userRole === vm.rolesConstantName.superAdmin){
                		vm.isFirstCardActive = true;
                	}
                	if(vm.userRole === vm.rolesConstantName.ngoAdmin){
                		vm.isSecondTabActive = true;
                	}
                	if(vm.userRole === vm.rolesConstantName.ngo){
                		vm.isSecondTabActive = true;
                	}
                	if(vm.userRole === vm.rolesConstantName.volunteer){
                		vm.isOrderActive = true;
                	}
                	if(vm.userRole === vm.rolesConstantName.client){
                		vm.isReportActive = true;
                	}
                	window.localStorage.setItem("userRole", vm.userRole);
                	vm.user = response.data.data;  
                	if (response.data.profileStatus == true || vm.userRole === "Super Admin") {
                		//popupService.showAlert("Please take few minutes to complete your profile");
                		vm.user = response.data.data;    
                		if(vm.userRole == "Volunteer"){
                			$state.go("volunteer-landing");
                		}
                	} else {
                		popupService.showAlert("Please take few minutes to complete your profile")
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
        	if(type === "ngo"){
        		vm.isFirstCardActive = true;
           	 	vm.isSecondTabActive = false;
           	 	vm.isThirdTabActive = false;
           		vm.isFourthTabActive = false;
        	}
        	if(type === "volunteer"){
        		vm.isFirstCardActive = false;
           	 	vm.isSecondTabActive = true;
           	 	vm.isThirdTabActive = false;
           		vm.isFourthTabActive = false;
        	}
        	if(type === "participant"){
        		vm.isFirstCardActive = false;
           	 	vm.isSecondTabActive = false;
           	 	vm.isThirdTabActive = true;
           		vm.isFourthTabActive = false;
        	}
        	if(type === "provider"){
        		vm.isFirstCardActive = false;
           	 	vm.isSecondTabActive = false;
           	 	vm.isThirdTabActive = false;
           		vm.isFourthTabActive = true;
        	}
        	if(type === "order"){
        		vm.isOrderActive = true;
        		vm.isReportActive = false;
        	}
        	if(type === "report"){
        		vm.isOrderActive = false;
        		vm.isReportActive = true;
        	}
        	
        	$rootScope.$broadcast('show-report-view', type);
        }
        
    }
})();