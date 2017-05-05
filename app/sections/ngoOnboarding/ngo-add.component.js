(function() {
	angular.module('app').component('addNgo', {
		bindings : {

		},
		templateUrl : 'ngo-add.tpl.html',
		controller : NgoAddUserController,
		controllerAs : 'vm'
	});
	NgoAddUserController.$inject = [ '$q', 'ngoOnboardingService', 'validateService',
			'orgService', '$scope', '$state', 'toastService' ];

	function NgoAddUserController($q, ngoOnboardingService, validateService, orgService,
			$scope, $state, toastService) {
		var vm = this;
		vm.noEdit=true;
		vm.validateNGOAdd = "";
		vm.validateInvite = true;
		vm.orgInfo = {};
		vm.sexList = [ {
			value : "M",
			label : "Male"
		}, {
			value : "F",
			label : "Female"
		}, {
			value : "O",
			label : "Other"
		} ];
		loadOrgInfo();
		vm.addNgoUser = function() {
			var data = {
				"firstName" : vm.adminName,
				"lastName" : vm.lastName,
				"phone" : vm.phone,
				"email" : vm.email,
				//"genderCode" : vm.sex,
				"orgId": vm.orgInfo.id
			};
			vm.validateNGOAdd = validateService.validateNGOAdd(data);
			if (vm.validateNGOAdd=="") {
				var serviceCalls = ngoOnboardingService
						.addNgoUser(data)
						.then(
								function successCallback(response) {
									if (response
											&& response.data.response
											&& response.data.response == "success") {
										toastService.showToast("Your request has submitted, please check your email for more details")
										$state.go('dashboard');
									} else {
										toastService.showToast("Failed : "
												+ response.data.errorMsg);
									}
								},
								function errorCallback(response) {
									toastService.showToast("Something went wrong, please try again")
									 $state.go('dashboard');
								});

				console.log(data);
				return $q.all(serviceCalls);
			} else {
				vm.validateInvite = true;
			}
		}

		function loadOrgInfo() {
			let organizationId = window.localStorage.getItem("userOrgInfo");
			if (organizationId) {
				orgService.getOrganization(organizationId).then(
						function(orgInfo) {
							if (orgInfo) {
								vm.orgInfo = orgInfo.data;
							}
						});
			}
		}
		vm.checkPhoneNbr = function() {
			var phone = vm.phone;
			var patt = new RegExp("(?=.*[0-9])(?=.*[-]).{12}");
			var res = patt.test(phone);
			if (res == true) {
				vm.check=false;
			} else {
				vm.check=true;
			}
		};

	}

})();