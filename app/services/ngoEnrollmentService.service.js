(function() {
    angular
        .module('app')
        .factory('ngoEnrollmentService', ngoEnrollmentService);

    ngoEnrollmentService.$inject = ['$http', 'serviceConstants'];

    function ngoEnrollmentService($http, serviceConstants) {
        let baseUrl = serviceConstants.baseUrl;

        return {
              postOverviewList,
              postStakeholdersList,
              postServiceList,
			  postFundingList,
        	  postNgoClientInfo
        };
        
        
        //Function to save overview details to temp db
        function postOverviewList(data) {
        	let overviewData = JSON.stringify(data);
            return $http.post(`${baseUrl}/`, overviewData);
        }
        
        //Function to save stakeholders details to temp db
        function postStakeholdersList(data) {
            let postData = JSON.stringify(data);
            return $http.post(`${baseUrl}/`, postData);
        }
        
      //Function to call the post service after submitting service details
        function postServiceList(data) {
           let enrollData = JSON.stringify(data);
            return $http.post(`${baseUrl}/`, enrollData);
        }
        
        function postFundingList(data) {
            let postData = JSON.stringify(data);
            return $http.post(`${baseUrl}/`, postData);
        }
        
        
        function postNgoClientInfo(data) {
            let postData = JSON.stringify(data);
            return $http.post(`${baseUrl}/`, postData);
        }
    }
})();
