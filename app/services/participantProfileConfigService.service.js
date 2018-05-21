(function() {
    angular
        .module('app')
        .factory('participantProfileConfigService', participantProfileConfigService);
    
    
    participantProfileConfigService.$inject = ['$http', 'serviceConstants'];

    function participantProfileConfigService($http, serviceConstants) {
        let baseUrl = serviceConstants.baseUrl;
        
        return{
        	getUserProfileConfiguration,
        	saveUserProfileConfiguration
        }
        
        function getUserProfileConfiguration(){
        	return $http.get(`${baseUrl}/users/participant/getconfig`)
        }

        function saveUserProfileConfiguration(profileConfig){
        	return $http.post(`${baseUrl}/users/participant/updateconfig`,profileConfig)
        }
        
        
    }
})();        