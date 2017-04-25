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
        	setPersonnalData
           
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
            	
            	return $http.post(`${baseUrl}/users/client/save`, clientInfoData);
            }
            
          
            function putElementsToMap(key, val) {
            	if (key.indexOf("__") == -1 ) {
            		finalSaveData[key] = val;
            	}
            }
               
 }
})();