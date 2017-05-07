(function() {
    angular
        .module('app')
        .service('joinUserService', joinUserService);

    joinUserService.$inject = ['$http', '$timeout', '$state', 'serviceConstants'];

    function joinUserService($http, $timeout, $state, serviceConstants) {
        let baseUrl = serviceConstants.baseUrl;


        return {
        	validateActivationCode
        };

       function validateActivationCode(type, activationCode) {
           return $http.get(`${baseUrl}/onboard/activate/${type}/${activationCode}`);
        }
    }
})();