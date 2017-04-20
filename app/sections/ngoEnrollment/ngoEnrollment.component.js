(function() {
	angular.module('app').component('ngoEnrollment', {
		bindings : {

		},
		templateUrl : 'ngoEnrollment.tpl.html',
		controller : NgoEnrollmentController,
		controllerAs : 'vm'
	});
	NgoEnrollmentController.$inject = [ '$q', 'ngoOnboardingService', '$scope',
			'$state' ];

	function NgoEnrollmentController($q, ngoOnboardingService, $scope, $state) {
		var USER_ORG_INFO = "userOrgInfo";
		var USER_TYPE = "userType";

		var vm = this;
		vm.userType = vm.getUserType;
		vm.userNameMessage = "";

		vm.signIn = function() {
			var data = {
				"firstName" : vm.firstName,
				"lastName" : vm.lastName,
				"email" : vm.username,
				"password" : vm.password,
				"organizationId" : vm.getOrgInfo()
			};

			ngoOnboardingService.registerNgo(data).then(function(response) {
				if (response && response.data && response.data.success) {
					alert(response.data.success)
					$state.go('login');
				} else {
					alert("Failed to create user entry");
				}
			});

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
	}

})();