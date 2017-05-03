/**
 * 
 */

(function() {
	angular.module('app').component('clientInvitation', {
		bindings : {

		},
		templateUrl : 'clientInvitation.tpl.html',
		controller : clientInvitationController,
		controllerAs : 'vm'
	});
	clientInvitationController.$inject = [ '$q', 'clientEnrollmentService', '$scope',
			'$state', 'toastService' ];

	function clientInvitationController($q, clientEnrollmentService, $scope, $state,
			toastService) {
		var vm = this;
		vm.orgInfo = {};
		vm.submit = function() {
			var data = {
				"name" : vm.name,
				"phone" : vm.phoneNumber,
				"email" : vm.email,
				"activationCode" : vm.activationCode
			};
			if (vm.name != null && vm.phoneNumber != null && vm.email != null) {
				var serviceCalls = clientEnrollmentService
						.inviteClient(data)
						.then(
								function successCallback(response) {
									if (response
											&& response.data.response
											&& response.data.response == "success") {
										toastService.showToast("Your request has been submitted");
										//$state.go('dashboard');
									} 
									else if(response
											&& response.data && !response.data.errorMsg){
										toastService.showToast("Something went wrong. Try again later");
									}
									else {
										toastService.showToast("Failed : "+ response.data.errorMsg);
									}
								},
								function errorCallback(response) {
									toastService.showToast("Something went wrong, please try again")
									// $state.go('dashboard');
								});

				console.log(data);
				return $q.all(serviceCalls);
			}
			
			else{
				toastService.showToast("Please fill mandatory fields");
			}
		}
		
		vm.checkPhoneNbr = function() {
			var phone = vm.phoneNumber;
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