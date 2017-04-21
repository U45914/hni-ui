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
            	var postData={
            			"personnal" : getPersonnalData(),
            			"connectionDetails" : getConnectionData(),
            			"familyAndEducation" : getFamilyData(),
            			"employment" : getEmploymentData(),
            			"foodPreferences" : getFoodData(),
            			"healthDetails" : getHealthData()
            	};
            	let partialData = JSON.stringify(postData);
            	console.log("Partial Data : "+partialData);
            	//return $http.post(`${baseUrl}/`, partialData);
            }
             
            function postClientInfo(){
            	var psnlData =getPersonnalData();
            	var cntData = getConnectionData();
            	var famData = getFamilyData();
            	var empData = getEmploymentData();
            	var fdData = getFoodData();
            	var hlthData = getHealthData();
            	var sumData= psnlData +","+ cntData +","+ famData +","+ empData +","+ fdData +","+ hlthData;
            	var postData={sumData};
               	let clientInfoData = JSON.stringify(postData);
            	console.log(postData);
            	//return $http.post(`${baseUrl}/`, partialData);
            }
               
 }
})();