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
	NgoInvitationController.$inject = [ '$q', 'ngoOnboardingService', 'orgService', 'validateService', '$scope',
			'$state', 'toaster' ];

	function NgoInvitationController($q, ngoOnboardingService, orgService, validateService, $scope, $state,
			toaster) {
		var vm = this;
		vm.incomplete = false;
		vm.orgInfo = {};
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
					"name" : vm.adminName,
					"address1" : vm.address1,
					"address2" : vm.address2,
					"city" : vm.city,
					"state" : vm.state,
					"zip" : vm.zip
				} ]
			};
			
			vm.validateNGOInvitation = validateService.validateNGOOnboard(data);
			if (vm.validateNGOInvitation == "") {
				var serviceCalls = ngoOnboardingService
						.inviteNgo(data)
						.then(
								function successCallback(response) {
									if (response
											&& response.data.response
											&& response.data.response == "success") {
										toaster
												.success("Your request has been submitted")
										$state.go('dashboard');
									} 
									else if(response && response.data.response && response.data.response == "error"){
										vm.incomplete = true;
										vm.validateNGOInvitation = "Error : " +response.data.errorMsg;
									}
									else {
										toaster.success("Failed : "
												+ response.data.errorMsg);
										window.alert(response.data.errorMsg);
										vm.incomplete = true;
										vm.validateNGOInvitation = "Something went wrong, please try again";
									}
								},
								function errorCallback(response) {
									toaster
											.success("Something went wrong, please try again")
									// $state.go('dashboard');
									vm.incomplete = true;
									vm.validateNGOInvitation = "Something went wrong, please try again";
								});

				return $q.all(serviceCalls);
			}
			else{
				vm.incomplete = true;
			}
		}
		
		function loadOrgInfo() {
			let organizationId = window.localStorage.getItem("userOrgInfo");
			 
			if (organizationId) {
				orgService.getOrganization(organizationId).then(function(orgInfo) {
					if (orgInfo){
						vm.orgInfo = orgInfo.data;
					}
				});
			}
		}
		
	}

})();