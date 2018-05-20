(function () {
  angular
      .module('app')
        .component('profileConfiguration', {
          bindings: {

          },
          templateUrl: 'participantProfileConfig.tpl.html',
          controller: participantProfileController,
          controllerAs: 'vm'
        }) ;
  
  
    participantProfileController.$inject = [ '$q', 'participantProfileConfigService',
		'$scope', '$state', 'toastService', 'validateFormData' ,'$rootScope'];
  	
  	function participantProfileController ($q, participantProfileConfigService, $scope, $state, 
				toastService, validateFormData,$rootScope) {
  		
  		var vm = this;
  		
  		participantProfileConfigService.getUserProfileConfiguration().then(
  				function successCallback(response){
  						vm.addressLine1 = (response.data.addressLine1 == 1)  ? true : false,
		  					vm.addressLine2  = (response.data.addressLine2 == 1)  ? true : false,
		  					vm.city = (response.data.city == 1)  ? true : false,
		  					vm.state = (response.data.state == 1)  ? true : false,
		  					vm.zipCode = (response.data.zipCode == 1)  ? true : false,
		  					vm.ethinCity = (response.data.ethniCity == 1)  ? true : false,
		  					vm.phoneNumber = (response.data.phoneNumber == 1)  ? true : false,
		  					vm.dob = (response.data.dob == 1)  ? true : false,
		  					vm.everBeenArrested = (response.data.everBeenArrested == 1)  ? true : false,
		  					vm.convOfFelony = (response.data.conivtedOfFelony  == 1)  ? true : false,
		  					vm.smartPhone= (response.data.smartPhone   == 1)  ? true : false,
		  					vm.monthlyPlan = (response.data.monthlyPlan == 1)  ? true : false,
		  					vm.noOfSiblings = (response.data.noOfSiblings  == 1)  ? true : false,
		  					vm.noOfKids = (response.data.noOfKids  == 1)  ? true : false,
		  					vm.liveAtHome = (response.data.liveAtHome  == 1)  ? true : false,
		  					vm.housingStatus = (response.data.housingStatus  == 1)  ? true : false,
		  					vm.education= (response.data.education  == 1)  ? true : false,
		  					vm.parentalEducation= (response.data.parentalEducation  == 1)  ? true : false,
		  					vm.enrolled= (response.data.enrolled   == 1)  ? true : false,
		  					vm.residentStatus= (response.data.residentStatus   == 1)  ? true : false,
		  					vm.workStatus= (response.data.workStatus   == 1)  ? true : false,
		  					vm.MonthlySpendigs = (response.data.monthlySpendings == 1)  ? true : false,
		  					vm.noOfMeals = (response.data.noOfMeals   == 1)  ? true : false,
		  					vm.foodPreferences = (response.data.foodPreferences  == 1)  ? true : false,
		  					vm.purchaseLocation = (response.data.purchaseLocation  == 1)  ? true : false,
		  					vm.cookingOptions  = (response.data.cookingOptions  == 1)  ? true : false,
		  					vm.distanceOfTravel = (response.data.distanceOfTravel  == 1)  ? true : false,
		  					vm.timeOfTravel  = (response.data.timeForTravel == 1)  ? true : false,
		  					vm.SubsProgram = (response.data.subsidisedFoodPrograms == 1)  ? true : false,
		  					vm.allergies  = (response.data.allergies  == 1)  ? true : false,
		  					vm.historyOfAddiction  = (response.data.historyOfAddiction  == 1)  ? true : false,
		  					vm.mentalHealth = (response.data.mentalHealth == 1)  ? true : false,
		  					vm.height = (response.data.height   == 1)  ? true : false,
		  					vm.weight = (response.data.weight   == 1)  ? true : false,
		  					vm.excercisePerWeek= (response.data.excercisePerWeek  == 1)  ? true : false,
		  					vm.doctorAppointment =(response.data.doctorAppointment   == 1)  ? true : false,
		  					vm.dentistAppointment = (response.data.dentistAppointment   == 1)  ? true : false
  					
  				});
  		
  		vm.save = function(){
  			
  			var data = {
  					
  					"addressLine1":(vm.addressLine1 == true) ? 1: 0,
  					"addressLine2":(vm.addressLine2 == true) ? 1: 0,
  					"city": (vm.city == true) ? 1: 0,
  					"state": (vm.state == true) ? 1: 0,
  					"zipCode":(vm.zipCode == true) ? 1: 0,
  					"ethniCity": (vm.ethinCity== true) ? 1: 0,
  					"phoneNumber": (vm.phoneNumber == true) ? 1: 0,
  					"dob": (vm.dob == true) ? 1: 0,
  					"everBeenArrested": (vm.everBeenArrested == true) ? 1: 0,
  					"conivtedOfFelony": (vm.convOfFelony == true) ? 1: 0,
  					"smartPhone": (vm.smartPhone == true) ? 1: 0,
  					"monthlyPlan": ( vm.monthlyPlan == true) ? 1: 0,
  					"noOfSiblings": (vm.noOfSiblings == true) ? 1: 0,
  					"noOfKids": (vm.noOfKids == true) ? 1: 0,
  					"liveAtHome": (vm.liveAtHome == true) ? 1: 0,
  					"housingStatus": (vm.housingStatus == true) ? 1: 0,
  					"education":(vm.education == true) ? 1: 0,
  					"parentalEducation": (vm.parentalEducation == true) ? 1: 0,
  					"enrolled": (vm.enrolled == true) ? 1: 0,
  					"residentStatus": (vm.residentStatus == true) ? 1: 0,
  					"workStatus": (vm.workStatus == true) ? 1: 0,
  					"monthlySpendings":(vm.MonthlySpendigs == true) ? 1: 0,
  					"noOfMeals": (vm.noOfMeals == true) ? 1: 0,
  					"foodPreferences": (vm.foodPreferences == true) ? 1: 0,
  					"purchaseLocation":(vm.purchaseLocation == true) ? 1: 0,
  					"cookingOptions": (vm.cookingOptions == true) ? 1: 0,
  					"distanceOfTravel":(vm.distanceOfTravel == true) ? 1: 0,
  					"timeForTravel": (vm.timeOfTravel == true) ? 1: 0,
  					"subsidisedFoodPrograms":(vm.SubsProgram == true) ? 1: 0,
  					"allergies": (vm.allergies == true) ? 1: 0,
  					"historyOfAddiction": (vm.historyOfAddiction == true) ? 1: 0,
  					"mentalHealth":(vm.mentalHealth == true) ? 1: 0,
  					"height": (vm.height == true) ? 1: 0,
  					"weight": (vm.weight == true) ? 1: 0,
  					"excercisePerWeek": (vm.excercisePerWeek == true) ? 1: 0,
  					"doctorAppointment": (vm.doctorAppointment == true) ? 1: 0,
  					"dentistAppointment": (vm.dentistAppointment == true) ? 1: 0
  			}
  		 
  			participantProfileConfigService.saveUserProfileConfiguration(data).then(
					function successCallback(response) {
						if(response.data.SUCCESS){
						 toastService.showToast("Participant Profile Confguration Updated Successfully ");
						}else{
							toastService.showToast("Participant Profile Confguration Failed ");
						}
					});
  		}
  		
  		
  	}
  
})();