(function() {
	angular.module('app').component('volunteerEnrollment', {
		bindings : {

		},
		templateUrl : 'volunteerEnrollment.tpl.html',
		controller : VolunteerEnrollmentController,
		controllerAs : 'vm'
	});
	VolunteerEnrollmentController.$inject = [ '$q', 'ngoOnboardingService', '$scope', '$state','validateService', 'toastService', 'validateFormData'];

	function VolunteerEnrollmentController($q, ngoOnboardingService, $scope, $state, validateService, toastService, validateFormData) {
		var USER_TYPE = "userType";
		var USER_ORG_INFO = "userOrgInfo";
		
		var vm = this;
		vm.userType = vm.getUserType;
		vm.userNameMessage = "";
		vm.states = validateService.validateStateDrpdwn();
		vm.fields = {};
		vm.msgs = {};
		
		vm.signIn = function() {
			var data = {
				"firstName" : vm.firstName,
				"lastName" : vm.lastName,
				"email" : vm.username,
				"password" : vm.password,
				"organizationId" : vm.getOrgInfo(),
				"addresses" : [ {
					"name" : "office",
					"address1" : vm.address,
					"city" : vm.city,
					"state" : vm.state,
					"zip" : vm.zip
				} ]
			};

			var doNotPost = false;
			var keys = Object.keys(vm.fields);
			for(var index = 0; index < keys.length; index++){
				if(vm.fields[keys[index]]) {
					doNotPost = true;
					break;
				}
			}
			if(!doNotPost){
				ngoOnboardingService.registerNgo(data).then(function(response) {
					if (response && response.data && response.data.success) {
						toastService.showToast(response.data.success + ", Please login with your credentials");
						$state.go('login');
					} else {
						toastService.showToast("Failed to create user entry");
					}
				});
			}
			else{
				toastService.showToast("Please fill required fields");
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

		vm.getUserType = function() {
			return window.localStorage.getItem(USER_TYPE);
		};
		
		vm.getOrgInfo = function() {
			return window.localStorage.getItem(USER_ORG_INFO);
		};
		
		vm.checkPhoneNbr = function() {
			var phone = vm.vol.user.mobilePhone;
			var patt = new RegExp("(?=.*[0-9])(?=.*[-]).{12}");
			var res = patt.test(phone);
			if (res == true) {
				vm.check=false;
			} else {
				vm.check=true;
			}
		};
		
		vm.validationCheck = function(type, id, value, event){
			var data = validateFormData.validate(type, id, value, event);
			vm.fields[id] = data.field[id];
			vm.msgs[id] = data.msg[id];
		};
	}

})();