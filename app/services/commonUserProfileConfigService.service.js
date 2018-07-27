(function() {
    angular
        .module('app')
        .factory('commonUserProfileConfigService', commonUserProfileConfigService);
    
    
    commonUserProfileConfigService.$inject = ['$http', 'serviceConstants'];

    function commonUserProfileConfigService($http, serviceConstants) {
        let baseUrl = serviceConstants.baseUrl;
        
        var formData = "";
        
        return{
        	getUserProfileConfiguration
        }
        
        
        function getUserProfileConfiguration(){
        	return $http.get(`${baseUrl}/users/participant/getconfig`)
        	 .then(function (response){
        		 
        		 formData =
        			 {
					        "addressLine1" : (response.data.addressLine1 == 1)  ? true : false,
		  					"addressLine2"  : (response.data.addressLine2 == 1)  ? true : false,
		  					"city" : (response.data.city == 1)  ? true : false,
		  					"state": (response.state == true) ? 1: 0,
		  					"zipCode" :  (response.data.zipCode == 1)  ? true : false,
		  					"ethinCity" :  (response.data.ethniCity == 1)  ? true : false,
		  					"phoneNumber": (response.phoneNumber == true) ? 1: 0,
		  					"dob" : (response.data.dob == 1)  ? true : false,
		  					"everBeenArrested" : (response.data.everBeenArrested == 1)  ? true : false,
		  					"convOfFelony" : (response.data.conivtedOfFelony  == 1)  ? true : false,
		  					"smartPhone" : (response.data.smartPhone   == 1)  ? true : false,
		  					"monthlyPlan": (response.data.monthlyPlan == 1)  ? true : false,
		  					"noOfSiblings" : (response.data.noOfSiblings  == 1)  ? true : false,
		  					"noOfKids" : (response.data.noOfKids  == 1)  ? true : false,
		  					"liveAtHome" : (response.data.liveAtHome  == 1)  ? true : false,
		  					"housingStatus": (response.housingStatus == true) ? 1: 0,
		  					"education" : (response.data.education  == 1)  ? true : false,
		  					"parentalEducation": (response.parentalEducation == true) ? 1: 0,
		  					"enrolled" : (response.data.enrolled   == 1)  ? true : false,
		  					"residentStatus" : (response.data.residentStatus   == 1)  ? true : false,
		  					"workStatus" : (response.data.workStatus   == 1)  ? true : false,
		  					"MonthlySpendigs" : (response.data.monthlySpendings == 1)  ? true : false,
		  					"noOfMeals": (response.data.noOfMeals   == 1)  ? true : false,
		  					"foodPreferences" : (response.data.foodPreferences  == 1)  ? true : false,
		  					"purchaseLocation" : (response.data.purchaseLocation  == 1)  ? true : false,
		  					"cookingOptions"  : (response.data.cookingOptions  == 1)  ? true : false,
		  					"distanceOfTravel" : (response.data.distanceOfTravel  == 1)  ? true : false,
		  					"timeOfTravel"  : (response.data.timeForTravel == 1)  ? true : false,
		  					"SubsProgram" : (response.data.subsidisedFoodPrograms == 1)  ? true : false,
		  					"allergies"  : (response.data.allergies  == 1)  ? true : false,
		  					"historyOfAddiction"  : (response.data.historyOfAddiction  == 1)  ? true : false,
		  					"mentalHealth" :  (response.data.mentalHealth == 1)  ? true : false,
		  					"height " : (response.data.height   == 1)  ? true : false,
		  					"weight" : (response.data.weight   == 1)  ? true : false,
		  					"excercisePerWeek" : (response.data.excercisePerWeek  == 1)  ? true : false,
		  					"doctorAppointment" :(response.data.doctorAppointment   == 1)  ? true : false,
		  					"dentistAppointment" : (response.data.dentistAppointment   == 1)  ? true : false
		  }
		  
        		 
        		 return formData;
        		 
        	 })
        }
        
        
    }
    
})();    