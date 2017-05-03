(function() {
	angular.module('app').component('credentialSetup', {
		bindings : {

		},
		templateUrl : 'credential-setup.tpl.html',
		controller : CredentialSetupController,
		controllerAs : 'vm'
	});
	CredentialSetupController.$inject = [ '$q', 'ngoOnboardingService', 'validateService', '$scope',
			'$state','toastService' ];

	function CredentialSetupController($q, ngoOnboardingService, validateService, $scope, $state, toastService) {
		var USER_ORG_INFO = "userOrgInfo";
		var USER_TYPE = "userType";

		var vm = this;
		vm.userType = getUserType();
		vm.userNameMessage = "";
		vm.validateUserEnrollment = "";
		vm.username = getUserName();
		vm.activationCodeNeeded = vm.userType === "client"
		vm.activationCode;
		vm.signIn = function() {
			var data = {
				"firstName" : vm.firstName,
				"lastName" : vm.lastName,
				"email" : getUserName(),
				"password" : vm.password,
				"organizationId" : getOrgInfo()
			};
			
			vm.validateUserEnrollment = validateService.validateNGOEnrollment(data,vm.passwordConfirm);
			if(vm.validateUserEnrollment == ""){
				vm.errorText = false;
				ngoOnboardingService.registerNgo(data, vm.activationCode).then(function(response) {
					if (response && response.data && response.data.success) {
						toastService.showToast(response.data.success)
						$state.go('login');
					} else {
						toastService.showToast("Failed to create user entry");
					}
				});
			}
			return;
		};

		vm.checkAvailability = function() {
			ngoOnboardingService.checkUsernameAvailability(vm.username).then(
					function(response) {
						if (response && response.data
								&& response.data.available == 'true') {
							vm.userNameMessage = "Username available";
						} else if (response && response.data
								&& response.data.available == 'false') {
							vm.userNameMessage = "Username not available";
						} else if (response && response.data
								&& response.data.error) {
							vm.userNameMessage = response.data.error;
						}
					});
		};

		vm.checkPassword = function() {
			var pass = vm.password;
			var patt = new RegExp("(?=.*[0-9])(?=.*[a-z])(?=.*[@#$%^&+=]).{6,}");
			var res = patt.test(pass);
			if (res == true) {
				vm.check=false;
			} else {
				vm.check=true;
			}
		};

		function getUserType() {
			return window.localStorage.getItem(USER_TYPE);
		};

		function getOrgInfo() {
			return window.localStorage.getItem(USER_ORG_INFO);
		};
		
		function getUserName() {
			return window.localStorage.getItem("userName");
		};
		vm.checkPhoneNbr = function() {
			var phone = vm.mobilePhone;
			var patt = new RegExp("(?=.*[0-9])(?=.*[-]).{12}");
			var res = patt.test(phone);
			if (res == true) {
				vm.check1=false;
			} else {
				vm.check1=true;
			}
		};
	}

})();