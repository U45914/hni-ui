(function() {
    angular
        .module('app')
        .factory('clientEnrollmentService', clientEnrollmentService);

    clientEnrollmentService.$inject = ['$http', 'serviceConstants', 'toastService'];

    function clientEnrollmentService($http, serviceConstants, toastService) {
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
        	getProfileData,
        	inviteClient,
        	personnalData,
            connectionData,
            familyData,
            employmentData,
            foodData,
            healthData,
            prepareClientJson
           
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
            	// Prepared data before saving to sending to partial data services
            	prepareClientJson();
            	
               	let partialData = JSON.stringify(finalSaveData);
            	return $http.post(`${baseUrl}/onboard/client/save`, partialData);
            }
             
            function postClientInfo(){
            	
               	let clientInfoData = JSON.stringify(finalSaveData);
            	var pass = validateCientInfoData(finalSaveData);
            	if(!pass){
            		toastService.showToast("Please fill required fields");
            		return;
            	}
            	return $http.post(`${baseUrl}/users/client/save`, clientInfoData);
            }
            
            function validateCientInfoData(data){
            	var user = data.user;
            	var address = data.address;
            	if(user == null){
            		return false;
            	}
            	if(user.firstName == null || user.mobilePhone == null){
            		return false;
            	}
            	if(address.state == null){
            		return false;
            	}
            	
            	return true;
            	
            }
          
            function prepareClientJson() {
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
            	
            	return finalSaveData;
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
            	return $http.get(`${baseUrl}/users/client/profile`)
            }
               
 }
})();