/**
 * 
 */

(function() {
	angular.module('app').component('ngoInvitation', {
		bindings : {

		},
		templateUrl : 'ngoInvitation.tpl.html',
		controller : NgoInvitationController,
		controllerAs : 'vm'
	});
	NgoInvitationController.$inject = [ '$q', 'ngoOnboardingService',
			'orgService', 'validateService', '$scope', '$state', 'toastService' ];

	function NgoInvitationController($q, ngoOnboardingService, orgService,
			validateService, $scope, $state, toastService) {
		var vm = this;
		vm.incomplete = false;
		vm.orgInfo = {};
		vm.fields = {};
		vm.msgs = {};
		vm.states = validateService.validateStateDrpdwn();
		vm.validateNGOInvitation = "";
		loadOrgInfo();
		vm.submit = function() {
			var data = {
				"name" : vm.name,
				"phone" : vm.phoneNumber,
				"email" : vm.email,
				"website" : vm.webSiteUrl,
				"logo" : vm.logo,
				"addresses" : [ {
					"name" : "office",
					"address1" : vm.address1,
					"address2" : vm.address2,
					"city" : vm.city,
					"state" : vm.state,
					"zip" : vm.zip
				} ]
			};
			console.log(data);
			vm.validateNGOInvitation = validateService.validateNGOOnboard(data);
			if (vm.validateNGOInvitation == "") {
				var serviceCalls = ngoOnboardingService
						.inviteNgo(data)
						.then(
								function successCallback(response) {
									if (response
											&& response.data.response
											&& response.data.response == "success") {
										toastService
												.showToast("Your request has been submitted")
										$state.go('dashboard');
									} else if (response
											&& response.data.response
											&& response.data.response == "error") {
										vm.incomplete = true;
										toastService.showToast("Error : "
												+ response.data.errorMsg);
									} else if (response && response.data
											&& !response.data.errorMsg) {
										toastService
												.showToast("Something went wrong, please try again");
									} else {
										toastService.showToast("Failed : "
												+ response.data.errorMsg);
										vm.incomplete = true;
									}
								},
								function errorCallback(response) {
									toastService
											.showToast("Something went wrong, please try again")
									// $state.go('dashboard');
									vm.incomplete = true;
								});

				return $q.all(serviceCalls);
			} else {
				vm.incomplete = true;
			}
		}

		function loadOrgInfo() {
			let
			organizationId = window.localStorage.getItem("userOrgInfo");

			if (organizationId) {
				orgService.getOrganization(organizationId).then(
						function(orgInfo) {
							if (orgInfo) {
								vm.orgInfo = orgInfo.data;
							}
						});
			}
		}
		vm.validationCheck = function(type, id, value, event) {

			if (value != null) {

				vm.fields[id] = false;

				if (type == "number") {

					if (id == "zip") {
						var zip = vm.zip;
						if (isNaN(Number(zip)) || (zip.length != 6)
								|| zip.indexOf("-") != -1) {
							vm.fields[id] = true;
							vm.msgs[id] = "Invalid zip code";
						} else {
							vm.fields[id] = false;
						}

					}

				}else{
					vm.fields[id] = false;
				}
				
			} else {
				if (id == "email" || id == "website") {
					if (event.target.value != "" && value == null) {
						vm.fields[id] = true;
						vm.msgs[id] = "Invalid Format";
					} else {
						vm.fields[id] = true;
						vm.msgs[id] = "Please fill this field";
					}

				} else {
					vm.fields[id] = true;
					vm.msgs[id] = "Please fill this field";
				}
			}

		}

		vm.checkPhoneNbr = function() {
			var phone = vm.phoneNumber;
			var patt = new RegExp("(?=.*[0-9])(?=.*[-]).{12}");
			var res = patt.test(phone);
			if (res == true) {
				vm.check = false;
			} else {
				vm.check = true;
			}
		};

	}

})();