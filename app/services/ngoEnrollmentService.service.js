(function() {
    angular
        .module('app')
        .factory('ngoEnrollmentService', ngoEnrollmentService);

    ngoEnrollmentService.$inject = ['$http', 'serviceConstants'];

    function ngoEnrollmentService($http, serviceConstants) {
        let baseUrl = serviceConstants.baseUrl;
        var stakeHolderData;
        var overviewData;
        var serviceData;
        var fundingData;
        var clientData;
        return {
        	  savePartial,
        	  postNgoEnrollData,
        	  setOverviewData:setOverviewData,
        	  getOverviewData:getOverviewData,
        	  setStakeHolderData:setStakeHolderData,
        	  getStakeHolderData:getStakeHolderData,
        	  setServiceData:setServiceData,
        	  getServiceData:getServiceData,
        	  setFundingData:setFundingData,
        	  getFundingData:getFundingData,
        	  setClientData:setClientData,
        	  getClientData:getClientData,
        	  stakeHolderData,
        	  serviceData,
        	  fundingData,
        	  clientData
              };
        
         
        function setOverviewData(data){
        	overviewData = data
        }
        
        function getOverviewData(){
        	return overviewData
        }
        
        function setStakeHolderData(data){
        	stakeHolderData = data
        }
        
        function getStakeHolderData(){
        	return stakeHolderData
        }
        function setServiceData(data){
        	serviceData = data
        }
        
        function getServiceData(){
        	return serviceData
        }
        function setFundingData(data){
        	fundingData = data
        }
        
        function getFundingData(){
        	return fundingData
        }
        
        function setClientData(data){
        	clientData = data
        }
        
        function getClientData(){
        	return clientData
        }
             
        function savePartial() {
        	var postData={
        			"overview" : getOverviewData(),
        			"stakeholders" : getStakeHolderData(),
        			"service" : getServiceData(),
        			"funding" : getFundingData(),
        			"client" : getClientData()
        	};
        	let partialData = JSON.stringify(postData);
        	console.log("Partial Data : "+partialData);
        	return $http.post(`${baseUrl}/onboard/ngo/save`, partialData);
        }
        
        function postNgoEnrollData(){
        	var postData={
        			"overview" : getOverviewData(),
        			"stakeHolder" : getStakeHolderData(),
        			"service" : getServiceData(),
        			"funding" : getFundingData(),
        			"client" : getClientData()
        	};
        	let enrollData = JSON.stringify(postData);
        	console.log("Submitted Info : "+enrollData);
        	return $http.post(`${baseUrl}/onboard/ngo/ngoSave`, enrollData);
        	
        }
        
        function getProfileData(){
        	return $http.get(`${baseUrl}/user/ngo/profile`).then(function(response){
        		if(response || response.data){
        			overviewData = response.data.overview;
        			stakeHolderData = response.data.stakeHolderData;
        			serviceData = response.data.serviceData;
        			fundingData = response.data.fundingData;
        			clientData = response.data.clientData;
        		}
        	});
        }
    }
})();
