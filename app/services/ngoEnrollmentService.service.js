(function() {
    angular
        .module('app')
        .factory('ngoEnrollmentService', ngoEnrollmentService);

    ngoEnrollmentService.$inject = ['$http', 'serviceConstants'];

    function ngoEnrollmentService($http, serviceConstants) {
        let baseUrl = serviceConstants.baseUrl;

        return {
        	postStakeholdersList,
        	postFundingList,
        	postNgoClientInfo
        };
        
        function postStakeholdersList(data) {
            let postData = JSON.stringify(data);
            console.log(postData)
            return $http.post(`${baseUrl}/`, postData);
        }
        
        function postFundingList(data) {
            let postData = JSON.stringify(data);
            console.log(postData)
            return $http.post(`${baseUrl}/`, postData);
        }
        
        
        function postNgoClientInfo(data) {
            let postData = JSON.stringify(data);
            console.log(postData)
            return $http.post(`${baseUrl}/`, postData);
        }
    }
})();