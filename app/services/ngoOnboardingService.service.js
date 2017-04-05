(function() {
    angular
        .module('app')
        .factory('ngoOnboardingService', ngoOnboardingService);

    ngoOnboardingService.$inject = ['$http', 'serviceConstants'];

    function ngoOnboardingService($http, serviceConstants) {
        let baseUrl = serviceConstants.baseUrl;

        return {
            postNgo,
            postNgoLogin
            
        };
        
        //Function to call post service while super admin add a new ngo
        function postNgo(data) {
            let postData = JSON.stringify(data);
            return $http.post(`${baseUrl}/`, postData);
        }
        
        //Function to call post service while new ngo login to enroll in HNI.
        function postNgoLogin(data) {
            let postData = JSON.stringify(data);
            console.log("inside service controller"+ postData);
            return $http.post(`${baseUrl}/`, postData);
        }
     }
})();