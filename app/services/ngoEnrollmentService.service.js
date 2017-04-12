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
              postOverviewList,
              postStakeholdersList,
              postServiceList,
			  postFundingList,
        	  postNgoClientInfo,
        	  postNgoEnrollData,
        	  overviewData,
        	  stakeHolderData,
        	  serviceData,
        	  fundingData,
        	  clientData
              };
        
        
        //Function to save overview details to temp db
        function postOverviewList(data) {
        	let overviewData = JSON.stringify(data);
        	//return $http.post(`${baseUrl}/`, overviewData);
        }
        
        //Function to save stakeholders details to temp db
        function postStakeholdersList(data) {
            let stakeHolderData = JSON.stringify(data);
           // return $http.post(`${baseUrl}/`, stakeHolderData);
        }
        
      //Function to call the post service after submitting service details
        function postServiceList(data) {
           let serviceData = JSON.stringify(data);
          // return $http.post(`${baseUrl}/`, enrollData);
        }
        
        function postFundingList(data) {
            let fundingData = JSON.stringify(data);
          //  return $http.post(`${baseUrl}/`, postData);
        }
        
        
        function postNgoClientInfo(data) {
            let clientData = JSON.stringify(data);
           // return $http.post(`${baseUrl}/`, postData);
        }
        function postNgoEnrollData(data){
        	let enrollData = JSON.stringify(data);
        	console.log("enroll Data"+enrollData);
        	
        }
    }
})();
