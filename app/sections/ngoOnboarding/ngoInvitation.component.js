/**
 * 
 */

(function() {
	angular.module('app').component('ngoInvitation', {
		bindings : {

		},
		templateUrl : 'ngo-invitation.tpl.html',
		controller : NgoInvitationController,
		controllerAs : 'vm'
	});
	NgoInvitationController.$inject = [ '$q', 'ngoOnboardingService',
			'orgService', 'validateService', '$scope', '$state', 'toastService', 'validateFormData' ];

	function NgoInvitationController($q, ngoOnboardingService, orgService,
			validateService, $scope, $state, toastService, validateFormData) {
		var vm = this;
		vm.incomplete = false;
		vm.buttonAction = "INVITE";
		vm.disableSubmitButton = false;		
		vm.orgInfo = {};
		vm.checkEmail=false;
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
			vm.flag = false;
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
					vm.msgs[keys[index]] = "Please fill these fields";
					doNotPost = true;
					//break;
				}
			}
			if (!doNotPost && (vm.checkEmail == true)) {
				vm.buttonAction = "Please wait...";
				vm.disableSubmitButton = true;			
				var serviceCalls = ngoOnboardingService.inviteNgo(data).then(
								function successCallback(response) {
									if (response && response.data.response && response.data.response == "success") {
										toastService.showToast("Your request has been submitted")
										$state.go('dashboard');
									} else if (response && response.data.response && response.data.response == "error") {
										vm.incomplete = true;
										toastService.showToast("Error : "+ response.data.errorMsg);
										vm.buttonAction = "Submit";
										vm.disableSubmitButton = false;
										
									} else if (response && response.data && !response.data.errorMsg) {
										toastService.showToast("Something went wrong, please try again");
										vm.buttonAction = "Submit";
										vm.disableSubmitButton = false;
										
									} else {
										toastService.showToast("Failed : "+ response.data.errorMsg);
										vm.incomplete = true;
										vm.buttonAction = "Submit";
										vm.disableSubmitButton = false;										
									}									
								},
								function errorCallback(response) {
									toastService.showToast("Something went wrong, please try again")
									// $state.go('dashboard');
									vm.incomplete = true;
								});

				return $q.all(serviceCalls);
			} else {
				toastService.showToast("Please complete all the fields");
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

		vm.checkNgoEmailAvailability = function() {
			validateService.checkEmailAvailability(vm.email).then(
					function(response) {
		            	console.log(response)
						if (response && response.data
								&& response.data.available == 'true') {
							vm.userEmailMessage = null;
							vm.checkEmail = true;
						} else if (response && response.data
								&& response.data.available == 'false') {
							vm.userEmailMessage = "Email id already registered";
							vm.checkEmail = false;
						} else if (response && response.data
								&& response.data.error) {
							vm.userEmailMessage = response.data.error;
							vm.checkEmail = false;
						}
					});
		};
		
		vm.phoneFormat = function(event){
			var num = vm.phoneNumber;
		      if (num != null && num.indexOf("-") == -1 && num.length > 4)
		      {
		    	  vm.phoneNumber = num.substring(0,3) + "-" + num.substring(3,6) + "-" + num.substring(6,10);
		      }    
		}
		

	}

})();