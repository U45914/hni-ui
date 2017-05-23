(function() {
	angular.module('app').component('credentialSetup', {
		bindings : {

		},
		templateUrl : 'credential-setup.tpl.html',
		controller : CredentialSetupController,
		controllerAs : 'vm'
	});
	CredentialSetupController.$inject = [ '$q', 'ngoOnboardingService', 'validateService', '$scope',
			'$state','toastService','validateFormData' ];

	function CredentialSetupController($q, ngoOnboardingService, validateService, $scope, $state, toastService,validateFormData) {
		var USER_ORG_INFO = "userOrgInfo";
		var USER_TYPE = "userType";

		var vm = this;
		vm.fields = {};
		vm.msgs = {};
		vm.userType = getUserType();
		vm.buttonText = "Register";
		vm.isDisabled = false;
		vm.userNameMessage = "";
		vm.validateUserEnrollment = "";
		vm.username = getUserName();
		vm.firstName = getFirstName();
		vm.mobilePhone = getPhone();
		vm.activationCodeNeeded = vm.userType === "client";
		vm.activationCode= getActivationCode();
		vm.dependantsList = [];
		 for(var i=0; i<=getDependants(); i++){
			 vm.dependantsList.push(i);
		 }
		console.log(vm.userType);
		if(vm.userType.toUpperCase() == "volunteer".toUpperCase()){
			vm.headerMsg = "Create Primary volunteer profile";
		}else if(vm.userType.toUpperCase() == "ngo".toUpperCase()){
			vm.headerMsg  = "Create Primary NGO administrator profile";
		}else if(vm.userType.toUpperCase() == "client".toUpperCase()){
			vm.headerMsg  = "Create Primary client profile";
		}
		
		vm.signIn = function() {
			var data = {
				"firstName" : vm.firstName,
				"lastName" : vm.lastName,
				"email" : getUserName(),
				"mobilePhone" : getPhone(),
				"password" : vm.password,
				"organizationId" : getOrgInfo(),
				"additionalInfo" :{
					"dependants" : vm.dependants
				}
				
			};
			
			vm.validateUserEnrollment = validateService.validateNGOEnrollment(data,vm.passwordConfirm);
			if(vm.validateUserEnrollment == ""){
				vm.errorText = false;
				vm.buttonText = "Please wait...";
				vm.isDisabled = true;	
				ngoOnboardingService.registerUser(data).then(function(response) {
					if (response && response.data && response.data.success) {
						toastService.showToast(response.data.success)
						$state.go('login');
					} else {
						vm.buttonText = "Register";
						vm.isDisabled = false;
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
			var value = vm.password;
			var specialChar = /^[a-zA-Z0-9- ]*$/;
			var alphabets = /[a-z]/i;
			var number = /\d+/g;
			if (!specialChar.test(value) && number.test(value) && alphabets.test(value) && value.length>=6) {
				vm.check = false;
			} else {
				vm.check = true;
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
		function getFirstName() {
			return window.localStorage.getItem("firstName");
		};
		function getActivationCode() {
			return window.localStorage.getItem("userActivationCode");
		};
		function getDependants() {
			return window.localStorage.getItem("dependants");
		};
		function getPhone(){
			return window.localStorage.getItem("mobilePhone");
		}
		
		vm.checkPhoneNbr = function() {
			var phone = vm.mobilePhone;
			
			 if (phone.indexOf("-") == -1 && phone.length > 4)
		      {
		    	  vm.mobilePhone = phone.substring(0,3) + "-" + phone.substring(3,6) + "-" + phone.substring(6,10);
		      }  
		};
		vm.validationCheck = function(type, id, value, event) {
			var data = validateFormData.validate(type, id, value, event);
			vm.fields[id] = data.field[id];
			vm.msgs[id] = data.msg[id];
		};
	}

})();