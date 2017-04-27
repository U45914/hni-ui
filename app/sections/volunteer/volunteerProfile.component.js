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
		
	    
		//vm.vol = volunteerService.getProfileData();
	    

		vm.submit = function() {

			var data = {
				"firstName" : vm.vol.firstName,
				"lastName" : vm.vol.lastName,
				"address" : {
					"name" : vm.vol.name,
					"address1" : vm.vol.address1,
					"city" : vm.vol.city,
					"state" : vm.vol.state,
					"zip" : vm.vol.zip,
				},
				"phoneNumber" : vm.vol.phoneNumber,
				"email" : vm.vol.email,
				"birthday" : vm.vol.birthDate,
				"sex" : vm.vol.sex,
				"race" : vm.vol.race,
				"education" : vm.vol.highestLLevelOfEducationCompleted,
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