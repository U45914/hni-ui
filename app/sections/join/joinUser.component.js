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
        
        vm.message = "Welcome to Hunger: Not Impossible, Please wait while we validate your invitation";
        vm.$onInit = function() {
        	var activationCode = $state.params.activationCode;
        	var userType = $state.params.type;
        	joinUserService.validateActivationCode(userType, activationCode).then(function successCallback(httpResponse) {
        		if (httpResponse && httpResponse.data.response == 'success') {
        			setUserDataToLocalStorage(httpResponse.data, userType, activationCode);
        			forwardRequest(userType);
        		} else {
        			 vm.message = "Your invitation code has been expired.  Please raise a request for new invitation at hunger@notimpossiblelabs.com";
        		}
        	}, function errorCallback(err){
        		console.log(err);
        	});
        };
        
        function setUserDataToLocalStorage(userData, type, activationCode) {
        	//var additional = JSON.parse(userData.data);
        	window.localStorage.setItem(USER_ORG_INFO, userData.orgId);
        	window.localStorage.setItem("firstName", userData.firstName ? userData.firstName : "");
        	window.localStorage.setItem("userName", userData.userName);
        	window.localStorage.setItem("activationCode", activationCode);
        	window.localStorage.setItem("mobilePhone", userData.phone);
        	if(type === 'client')
        		window.localStorage.setItem("dependants", userData.dependants);
            	window.localStorage.setItem(USER_TYPE, type);
        }
        
        function forwardRequest(type) {
        	$state.go('credential-setup');
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