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
			'$state', 'toastService', 'validateFormData' ];

	function VolunteerInvitationController($q, volunteerService,  $scope, $state,
			toastService, validateFormData) {
		var vm = this;
		vm.orgInfo = {};
		vm.fields = {};
		vm.msgs = {};
		
		vm.submit = function() {
			var data = {
				"name" : vm.name,
				"phone" : vm.phoneNumber,
				"email" : vm.email,
				"invitationMessage" : vm.inviteMsg
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
				var serviceCalls = volunteerService
						.inviteVolunteer(data)
						.then(
								function successCallback(response) {
									if (response
											&& response.data.response
											&& response.data.response == "success") {
										toastService.showToast("Your request has been submitted")
										$state.go('dashboard');
									} else {
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
				toastService.showToast("Please fill required fields")
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
		vm.validationCheck = function(type, id, value, event){
			var data = validateFormData.validate(type, id, value, event);
			vm.fields[id] = data.field[id];
			vm.msgs[id] = data.msg[id];
		};
		
	}

})();