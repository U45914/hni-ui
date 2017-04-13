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
        			"overviewData" : getOverviewData(),
        			"stakeholdersData" : getStakeHolderData(),
        			"serviceData" : getServiceData(),
        			"fundingData" : getFundingData(),
        			"clientData" : getClientData()
        	};
        	let partialData = JSON.stringify(postData);
        	console.log(partialData);
        	//return $http.post(`${baseUrl}/`, partialData);
        }
        
        function postNgoEnrollData(){
        	var postData={
        			"overviewData" : getOverviewData(),
        			"stakeholdersData" : getStakeHolderData(),
        			"serviceData" : getServiceData(),
        			"fundingData" : getFundingData(),
        			"clientData" : getClientData()
        	};
        	let enrollData = JSON.stringify(postData);
        	console.log(enrollData);
        	
        }
    }
})();
