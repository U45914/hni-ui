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
			'orgService', 'validateService', '$scope', '$state', 'toastService', 'validateFormData' ];

	function NgoInvitationController($q, ngoOnboardingService, orgService,
			validateService, $scope, $state, toastService, validateFormData) {
		var vm = this;
		vm.incomplete = false;
		vm.orgInfo = {};
		vm.fields = {
				"name" : true,
				"phone" : true,
				"email" : true,
				"website" : true,
				"address1" : true,
				"city" : true,
				"state" : true,
				"zip" : true
		};
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
				"addresses" : [ {
					"name" : "office",
					"address1" : vm.address1,
					"address2" : vm.address2,
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
			if (!doNotPost) {
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
										// vm.validateNGOInvitation = "Error : "
										// +response.data.errorMsg;
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
										// vm.validateNGOInvitation = "Something
										// went wrong, please try again";
									}
								},
								function errorCallback(response) {
									toastService
											.showToast("Something went wrong, please try again")
									// $state.go('dashboard');
									vm.incomplete = true;
									// vm.validateNGOInvitation = "Something
									// went wrong, please try again";
								});

				return $q.all(serviceCalls);
			} else {
				toastService
				.showToast("Please fill required fields")
				/*vm.incomplete = true;*/
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
			var data = validateFormData.validate(type, id, value, event);
			vm.fields[id] = data.field[id];
			vm.msgs[id] = data.msg[id];
		}

		/*vm.checkPhoneNbr = function() {
			var phone = vm.phoneNumber;
			var patt = new RegExp("(?=.*[0-9])(?=.*[-]).{12}");
			var res = patt.test(phone);
			if (res == true) {
				vm.check = false;
			} else {
				vm.check = true;
			}
		};*/

	}

})();