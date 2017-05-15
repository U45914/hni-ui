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
			'$state', 'toastService', 'validateFormData','validateService' ];

	function VolunteerInvitationController($q, volunteerService,  $scope, $state,
			toastService, validateFormData,validateService) {
		var vm = this;
		vm.orgInfo = {};
		vm.checkEmail=false;
		vm.buttonText = "Invite";
		vm.isDisabled = false;
		vm.fields = {
				"name" : true,
				"phone" : true,
				"email" : true
		};
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
			
			if (!doNotPost && (vm.checkEmail == true)) {
				vm.buttonText = "Please wait...";
				vm.isDisabled = true;	
				var serviceCalls = volunteerService
						.inviteVolunteer(data)
						.then(
								function successCallback(response) {
									if (response
											&& response.data.response
											&& response.data.response == "success") {
										toastService.showToast("Your request has been submitted")
										$state.go('dashboard');
									} else if(response
											&& response.data.response && !response.data.errorMsg){
										toastService.showToast("Something went wrong. Try again later");
										vm.buttonText = "Invite";
										vm.isDisabled = false;
									}
										else {
										toastService.showToast("Failed : "+ response.data.errorMsg);
										vm.buttonText = "Invite";
										vm.isDisabled = false;
									}
								},
								function errorCallback(response) {
									toastService.showToast("Something went wrong, please try again");
									vm.buttonText = "Invite";
									vm.isDisabled = false;
									// $state.go('dashboard');
								});

				return $q.all(serviceCalls);
			}
			else{
				toastService.showToast("Please complete all the fields")
			}
		}
		
		vm.validationCheck = function(type, id, value, event){
			var data = validateFormData.validate(type, id, value, event);
			vm.fields[id] = data.field[id];
			vm.msgs[id] = data.msg[id];
		};
		
		vm.checkVolunteerEmailAvailability = function() {
			validateService.checkEmailAvailability(vm.email).then(
					function(response) {
		            	console.log(response)
						if (response && response.data
								&& response.data.available == 'true') {
							vm.userEmailMessage = null;
							vm.checkEmail=true;
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
		      if (num.indexOf("-") == -1 && num.length > 4)
		      {
		    	  vm.phoneNumber = num.substring(0,3) + "-" + num.substring(3,6) + "-" + num.substring(6,10);
		      }    
		}
	}

})();