(function() {
    angular
        .module('app')
        .factory('ngoOnboardingService', ngoOnboardingService);

    ngoOnboardingService.$inject = ['$http', 'serviceConstants'];

    function ngoOnboardingService($http, serviceConstants) {
        let baseUrl = serviceConstants.baseUrl;

        return {
            postNgo
            
        };
        
        function postNgo(data) {
        	alert(data);
            let postData = JSON.stringify(data);
            alert(postData);
           return $http.post(`${baseUrl}/`, postData);
        }
     }
})();