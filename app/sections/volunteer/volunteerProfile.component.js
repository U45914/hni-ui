(function() {
	angular.module('app').component('volunteerProfile', {
		bindings : {

		},
		templateUrl : 'volunteerProfile.tpl.html',
		controller : volunteerProfileController,
		controllerAs : 'vm'
	});

	volunteerProfileController.$inject = [ '$q', 'volunteerService','validateService', 'validateFormData' , 'toastService'];

	function volunteerProfileController($q, volunteerService,validateService,validateFormData,toastService) {
		var vm = this;
		vm.vol = {};
		vm.vol.user = {};
		vm.vol.address = {};
		this.myDate = new Date();
		this.isOpen = false;
		vm.state=validateService.validateStateDrpdwn();
		vm.fields = {
		};
		vm.msgs = {};
	    
		vm.vol = {};
		volunteerService.getProfileData().then(function(response){
			if (response && response.data){
				vm.vol = response.data.response;
				console.log(vm.vol);
				vm.vol.birthDate = new Date(vm.vol.birthday);		
			}
		});
		
	    
		function validateForm(data){
			if(data == null){
				return false;
			}
			else if(data.birthDate == null){
				return false;
			}
			
			if(data.user == null){
				return false;
			}
			else if( data.user.firstName == null || data.user.firstName == null || data.user.mobilePhone == null || data.user.email == null){
				return false;
			}
			
			if(data.address == null){
				return false;
			}
			else if(data.address.address1 == null || data.address.city == null || data.address.state == null || data.address.zip == null ){
				return false;
			}
			return true;
		}
		
		vm.submit = function() {
			var doNotPost = validateForm(vm.vol);
			if(doNotPost){
				var data = {
					"user" : {
						"firstName" : vm.vol.user.firstName,
						"lastName" : vm.vol.user.lastName,
						"mobilePhone" : vm.vol.user.mobilePhone,
						"email" : vm.vol.user.email
					},
					
					"address" : {
						"name" : "office",
						"address1" : vm.vol.address.address1,
						"address2" : vm.vol.address.address2,
						"city" : vm.vol.address.city,
						"state" : vm.vol.address.state,
						"zip" : vm.vol.address.zip,
					},
					
					"birthday" : vm.vol.birthDate,
					"sex" : vm.vol.sex,
					"race" : vm.vol.race,
					"education" : vm.vol.education,
					"maritalStatus" : vm.vol.maritalStatus,
					"income" : vm.vol.income,
					"kids" : vm.vol.kids,
					"employer" : vm.vol.employer,
					"nonProfit" : vm.vol.nonProfit
	
				};
	
		
					volunteerService.volunteerProfileData = data;
					var serviceCalls = volunteerService.profileDetails(data);
					return $q.all(serviceCalls);
			}
			else{
				toastService.showToast("Please fill required fields");
			}
		}
		
		vm.onChange = function(){
			if(vm.vol.maritalStatus == 1){
				vm.vol.kids = 0;
			}
		}
		
		vm.checkPhoneNbr = function() {
			var phone = vm.vol.user.mobilePhone;
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