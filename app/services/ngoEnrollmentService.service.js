(function() {
    angular
        .module('app')
        .factory('ngoEnrollmentService', ngoEnrollmentService);

    ngoEnrollmentService.$inject = ['$http', 'serviceConstants'];

    function ngoEnrollmentService($http, serviceConstants) {
        let baseUrl = serviceConstants.baseUrl;

        return {
              postStakeholdersList,
              overviewList,
              serviceList
        };
        
        function postStakeholdersList(data) {
            let postData = JSON.stringify(data);
            console.log(postData)
            return $http.post(`${baseUrl}/`, postData);
        }
        
        //Function to call the post service after submitting overview details
        function overviewList(data) {
        	alert("Entered Service");
           let enrollData = JSON.stringify(data);
            return $http.post(`${baseUrl}/`, enrollData);
        }
      //Function to call the post service after submitting service details
        function serviceList(data) {
        	alert("Entered Service");
           let enrollData = JSON.stringify(data);
            return $http.post(`${baseUrl}/`, enrollData);
        }
    }
})();
