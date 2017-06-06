(function() {
	angular.module('app').component('changePassword', {
		bindings : {

		},
		templateUrl : 'change-password.tpl.html',
		controller : ChangePasswordController,
		controllerAs : 'vm'
	});
	
	ChangePasswordController.$inject = [ 'validateService','ngoOnboardingService','toastService','$state'];
	
	function ChangePasswordController(validateService,ngoOnboardingService,toastService,$state) {
		var vm = this;
		
		vm.buttonText = "Change Password";
		vm.isDisabled = false;
		vm.validateChangepassword = "";
		vm.question = "";
		
		 vm.$onInit = function() {
			 ngoOnboardingService.getUserData().then(function success(response) {
	              if(response && response.data) {
	            	  vm.skey = response.data.skey;
	            	  vm.question = response.data.question;
	              }
	           });
	      }
		 
		vm.checkPassword = function() {
			var value = vm.password;
			var specialChar = /^[a-zA-Z0-9- ]*$/;
			var alphabets = /[a-z]/i;
			var number = /\d+/g;
			if (!specialChar.test(value) && number.test(value) && alphabets.test(value) && value.length>=6) {
				vm.check = false;
			} else {
				vm.check = true;
			}
		};
		
		vm.signIn = function() {
			var data = {
				"oldPassword" : vm.oldPassword,
				"password" : vm.password,
				"answer" : vm.answer,
				"sKey" : vm.skey
			};
		
		vm.validateChangepassword = validateService.validateChangepassword(data,vm.passwordConfirm);
		if(vm.validateChangepassword == ""){
			vm.errorText = false;
			vm.buttonText = "Please wait...";
			vm.isDisabled = true;	
			ngoOnboardingService.changePassword(data).then(function(response) {
				if (response && response.data && response.data.success) {
					toastService.showToast(response.data.success)
					$state.go('dashboard');
				} else {
					vm.buttonText = "Change Password";
					vm.isDisabled = false;
					toastService.showToast(response.data.error);
				}
			});
		}
		return;
	};
	}
})();
	