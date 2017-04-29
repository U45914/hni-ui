(function() {
    angular
        .module('app')
        .factory('clientEnrollmentService', clientEnrollmentService);

    clientEnrollmentService.$inject = ['$http', 'serviceConstants'];

    function clientEnrollmentService($http, serviceConstants) {
        let baseUrl = serviceConstants.baseUrl;
        var clientProfileData;
        var personnalData;
        var connectionData;
        var familyData;
        var employmentData;
        var foodData;
        var healthData;
        var finalSaveData = {};
        return {
        	 savePartial,
        	 postClientInfo,
        	 setPersonnalData:setPersonnalData,
        	 getPersonnalData:getPersonnalData,
        	 setConnectionData:setConnectionData,
        	 getConnectionData:getConnectionData,
        	 setFamilyData:setFamilyData,
        	 getFamilyData:getFamilyData,
        	 setEmploymentData:setEmploymentData,
        	 getEmploymentData:getEmploymentData,
        	 setFoodData:setFoodData,
        	 getFoodData:getFoodData,
        	 setHealthData:setHealthData,
        	 getHealthData:getHealthData,
        	setPersonnalData,
        	getProfileData
           
            };
        
            function setPersonnalData(data){
            	personnalData = data
            }
            
            function getPersonnalData(){
            	return personnalData
            }
            
            function setConnectionData(data){
            	connectionData = data
            }
            
            function getConnectionData(){
            	return connectionData
            }
            
            function setEmploymentData(data){
            	employmentData = data
            }
            
            function getEmploymentData(){
            	return employmentData
            }
            function setFamilyData(data){
            	familyData = data
            }
            
            function getFamilyData(){
            	return familyData
            }
            
            function setFoodData(data){
            	foodData = data
            }
            
            function getFoodData(){
            	return foodData
            }
            
            function setHealthData(data){
            	healthData = data
            }
            
            function getHealthData(){
            	return healthData
            }
           	 
            
            function savePartial() {
            	var psnlData =getPersonnalData();
            	var cntData = getConnectionData();
            	var famData = getFamilyData();
            	var empData = getEmploymentData();
            	var fdData = getFoodData();
            	var hlthData = getHealthData();
            	
            	angular.forEach(psnlData, function(val, key) {
            		putElementsToMap(key, val);
            	});
            	angular.forEach(cntData, function(val, key) {
            		putElementsToMap(key, val);
            	});
            	angular.forEach(famData, function(val, key) {
            		putElementsToMap(key, val);
            	});
            	angular.forEach(empData, function(val, key) {
            		putElementsToMap(key, val);
            	});
            	angular.forEach(fdData, function(val, key) {
            		putElementsToMap(key, val);
            	});
            	angular.forEach(hlthData, function(val, key) {
            		putElementsToMap(key, val);
            	});
            	
               	let partialData = JSON.stringify(finalSaveData);
            	return $http.post(`${baseUrl}/onboard/client/save`, partialData);
            }
       
             
            function postClientInfo(){
            	var psnlData = getPersonnalData();
            	var cntData = getConnectionData();
            	var famData = getFamilyData();
            	var empData = getEmploymentData();
            	var fdData = getFoodData();
            	var hlthData = getHealthData();
            	
            	angular.forEach(psnlData, function(val, key) {
            		putElementsToMap(key, val);
            	});
            	angular.forEach(cntData, function(val, key) {
            		putElementsToMap(key, val);
            	});
            	angular.forEach(famData, function(val, key) {
            		putElementsToMap(key, val);
            	});
            	angular.forEach(empData, function(val, key) {
            		putElementsToMap(key, val);
            	});
            	angular.forEach(fdData, function(val, key) {
            		putElementsToMap(key, val);
            	});
            	angular.forEach(hlthData, function(val, key) {
            		putElementsToMap(key, val);
            	});
            	
               	let clientInfoData = JSON.stringify(finalSaveData);
            	console.log("client : ");
            	console.log(clientInfoData);
            	return $http.post(`${baseUrl}/users/client/save`, clientInfoData);
            }
            
          
            function putElementsToMap(key, val) {
            	if (key.indexOf("__") == -1 ) {
            		finalSaveData[key] = val;
            	}
            }
            
            //Function to call post service to add a new client
            function inviteClient(data) {
                let postData = JSON.stringify(data);
                return $http.post(`${baseUrl}/onboard/client/user/invite`, postData);
            }
            
            function getProfileData(){
            	var data = {
            	    "id": 0,
            	    "userId": 0,
            	    "createdBy": 0,
            	    "race": 0,
            	    "addressId": 0,
            	    "bday": 0,
            	    "beenArrested": "string",
            	    "beenConvicted": "string",
            	    "hasSmartPhone": "string",
            	    "serviceProvider": "string",
            	    "model": "string",
            	    "haveMonthlyPlan": "string",
            	    "monthlyPlanMinute": "string",
            	    "monthlyPlanData": "string",
            	    "monthlyPlanCost": "string",
            	    "altMonthlyPlan": 0,
            	    "altMonthlyPlanTogether": "string",
            	   "sliblings": 0,
            	    "kids": 0,
            	    "liveAtHome": "string",
            	    "sheltered": 0,
            	    "parentEducation": 0,
            	    "education": 0,
            	    "enrollmentStatus": 0,
            	    "enrollmentLocation": "string",
            	    "workStatus": 0,
            	    "timeToWorkplace": 0,
            	    "noOfJob": 0,
            	    "employer": "string",
            	    "jobTitle": "string",
            	    "durationOfEmployement": 0,
            	    "unemploymentBenfits": "string",
            	    "reasonUnemploymentBenefits": "string",
            	    "totalIncome": 0,
            	    "rateAmount": 0,
            	    "rateType": 0,
            	    "avgHoursPerWeek": "string",
            	    "residentStatus": 0,
            	    "dollarSpendFood": 0,
            	    "dollarSpendClothes": 0,
            	    "dollarSpendEntertainment": 0,
            	    "dollarSpendTransport": 0,
            	    "dollarSpendSavings": 0,
            	    "mealsPerDay": 0,
            	    "foodPreference": 0,
            	    "foodSource": "string",
            	    "cook": "string",
            	    "travelForFoodDistance": 0,
            	    "travalForFoodTime": 0,
            	    "subFoodProgram": "string",
            	    "subFoodProgramEntity": "string",
            	    "subFoodProgramDuration": 0,
            	    "subFoodProgramRenew": 0,
            	    "subFoodProgramExp": "string",
            	    "allergies": "string",
            	    "addiction": "string",
            	    "addictionType": "string",
            	    "mentalHealthIssue": "string",
            	    "mentalHealthIssueHistory": "string",
            	    "height": "string",
            	    "weight": "string",
            	    "exercisePerWeek": 0,
            	    "lastVisitDoctor": 0,
            	    "lastVisitDentist": 0
            	}

            	return data;
            	//return $http.get(`${baseUrl}/users/ngo/profile`)
            }
               
 }
})();