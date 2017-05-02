(function() {
	angular.module('app').component('volunteerProfile', {
		bindings : {

		},
		templateUrl : 'volunteerProfile.tpl.html',
		controller : volunteerProfileController,
		controllerAs : 'vm'
	});

	volunteerProfileController.$inject = [ '$q', 'volunteerService','validateService' ];

	function volunteerProfileController($q, volunteerService,validateService) {
		var vm = this;
		this.myDate = new Date();
		this.isOpen = false;
		vm.state=validateService.validateStateDrpdwn();
		
	    
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
					"name" : vm.vol.address.name,
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

			// if(vm.vol.firstName!=null && vm.vol.lastName !=null &&
			// vm.vol.address!=null && vm.vol.phoneNumber !=null && vm.vol.email
			// !=null && vm.vol.birthDate !=null && vm.vol.sex !=null){
			console.log("Volunteer Json : "+data);
			volunteerService.volunteerProfileData = data;
			var serviceCalls = volunteerService.profileDetails(data);
			return $q.all(serviceCalls);
			/*
			 * } else{ console.log("Failed"); }
			 */
		}

	}
})();