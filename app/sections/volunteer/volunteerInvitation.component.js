/**
 * 
 */

(function() {
	angular.module('app').component('volunteerInvitation', {
		bindings : {

		},
		templateUrl : 'volunteerInvitation.tpl.html',
		controller : VolunteerInvitationController,
		controllerAs : 'vm'
	});
	VolunteerInvitationController.$inject = [ '$q', 'volunteerService', '$scope',
			'$state', 'toaster' ];

	function VolunteerInvitationController($q, volunteerService,  $scope, $state,
			toaster) {
		var vm = this;
		vm.orgInfo = {};
		vm.submit = function() {
			var data = {
				"name" : vm.name,
				"phone" : vm.phoneNumber,
				"email" : vm.email,
				"invitationMessage" : vm.inviteMsg
			};
			if (vm.name != null && vm.phoneNumber != null && vm.email != null) {
				var serviceCalls = volunteerService
						.inviteVolunteer(data)
						.then(
								function successCallback(response) {
									if (response
											&& response.data.response
											&& response.data.response == "success") {
										toaster.success("Your request has been submitted")
										$state.go('dashboard');
									} else {
										toaster.success("Failed : "+ response.data.errorMsg);
									}
								},
								function errorCallback(response) {
									toaster
											.error("Something went wrong, please try again")
									// $state.go('dashboard');
								});

				console.log(data);
				return $q.all(serviceCalls);
			}
		}
		
	}

})();