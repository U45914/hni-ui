(function() {
    angular
        .module('app')
        .component('joinUser', {
            bindings: {

            },
            templateUrl: 'join_user.tpl.html',
            controller: JoinUserController,
            controllerAs: 'vm'
        });

    JoinUserController.$inject = ['$location', '$state', 'joinUserService'];

    function JoinUserController($location, $state, joinUserService) {
        var vm = this;
        var USER_ORG_INFO = "userOrgInfo";
        var USER_TYPE 	= "userType";
        
        vm.message = "Welcome to Hunger: Not Impossible, ";
        vm.$onInit = function() {
        	var activationCode = $state.params.activationCode;
        	var userType = $state.params.type;
        	joinUserService.validateActivationCode(userType, activationCode).then(function successCallback(httpResponse) {
        		if (httpResponse && httpResponse.data.response == 'success') {
        			setUserDataToLocalStorage(httpResponse.data, userType);
        			forwardRequest(userType);
        		} else {
        			console.log('Your invitation code expired');
        		}
        	}, function errorCallback(err){
        		console.log(err);
        	});
        };
        
        function setUserDataToLocalStorage(userData, type) {
        	window.localStorage.setItem(USER_ORG_INFO, userData.orgId);
        	window.localStorage.setItem("userName", userData.userName);
        	window.localStorage.setItem(USER_TYPE, type);
        }
        
        function forwardRequest(type) {
        	$state.go('ngoEnrollment');
        	/*if (type == 'ngo') {
        		$state.go('ngoEnrollment');
        	} else if (type == 'volunteer') {
        		$state.go('volunteerEnrollment');
        	} else {
        		$state.go('dashboard');
        	}*/
        }
        
    }   
    
})();