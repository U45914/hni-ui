/**
 * 
 */

(function() {
	angular.module('app').component('addNgo', {
		bindings : {

		},
		templateUrl : 'ngo-add.tpl.html',
		controller : NgoAddUserController,
		controllerAs : 'vm'
	});
	NgoAddUserController.$inject = [ '$q', 'ngoOnboardingService',
			'orgService', '$scope', '$state', 'toaster' ];

	function NgoAddUserController($q, ngoOnboardingService, orgService,
			$scope, $state, toaster) {
		var vm = this;
		vm.noEdit=true;
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
				"name" : vm.name,
				"phone" : vm.phone,
				"email" : vm.email,
				"genderCode" : vm.sex,
				"orgId": vm.orgInfo.id
			};
			if (vm.name != null && vm.phone != null && vm.email != null) {
				var serviceCalls = ngoOnboardingService
						.addNgoUser(data)
						.then(
								function successCallback(response) {
									if (response
											&& response.data.response
											&& response.data.response == "success") {
										toaster
												.success("Your request has submitted, please check your email for more details")
										$state.go('dashboard');
									} else {
										toaster.success("Failed : "
												+ response.data.errorMsg);
									}
								},
								function errorCallback(response) {
									toaster
											.success("Something went wrong, please try again")
									 $state.go('dashboard');
								});

				console.log(data);
				return $q.all(serviceCalls);
			} else {
				alert("Please fill all field for user invitaion");
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

	}

})();