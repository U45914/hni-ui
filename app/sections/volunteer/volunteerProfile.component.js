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
		this.myDate = new Date();
		this.isOpen = false;
		vm.state=validateService.validateStateDrpdwn();
		vm.fields = {};
		vm.msgs = {};
	    
		vm.vol = {};
		volunteerService.getProfileData().then(function(response){
			if (response && response.data){
				vm.vol = response.data.response;
				console.log(vm.vol);
				vm.vol.birthDate = new Date(vm.vol.birthday);		
			}
		});
	    

		vm.submit = function() {

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

			var doNotPost = false;
			var keys = Object.keys(vm.fields);
			for(var index = 0; index < keys.length; index++){
				if(vm.fields[keys[index]]) {
					doNotPost = true;
					break;
				}
			}
			if(!doNotPost){
				console.log("Volunteer Json : "+data);
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