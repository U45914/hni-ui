(function() {
	angular.module('app').component('ngoEnrollment', {
		bindings : {

		},
		templateUrl : 'ngoEnrollment.tpl.html',
		controller : NgoEnrollmentController,
		controllerAs : 'vm'
	});
	NgoEnrollmentController.$inject = [ '$q', 'ngoOnboardingService', '$scope' ];

	function NgoEnrollmentController($q, ngoOnboardingService, $scope) {
		var USER_ORG_INFO = "userOrgInfo";
		var USER_TYPE = "userType";

		var vm = this;
		vm.userType = vm.getUserType;
		vm.userNameMessage = "";

		vm.signIn = function() {
			var data = {
				"firstName" : vm.firstName,
				"lastName" : vm.lastName,
				"userName " : vm.username,
				"password " : vm.password,
				"confirmedPassword " : vm.passwordConfirm
			};

			var serviceCalls = ngoOnboardingService.postNgoLogin(data);

			return $q.all(serviceCalls);
		};

		vm.checkAvailability = function() {
			ngoOnboardingService.checkUsernameAvailability(vm.username).then(function(response){
				if (response && response.data && response.data.available == 'true') {
					vm.userNameMessage = "Username available";
				} else if (response && response.data && response.data.available == 'false') {
					vm.userNameMessage = "Username not available";
				} else if (response && response.data && response.data.error) {
					vm.userNameMessage = response.data.error;
				}
			});
		};
		
		vm.getUserType = function() {
			return window.localStorage.getItem(USER_TYPE);
		};

		vm.getOrgInfo = function() {
			return window.localStorage.getItem(USER_ORG_INFO);
		};
	}

})();