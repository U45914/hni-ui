(function() {
    angular
        .module('app')
        .factory('providerService', providerService);

    providerService.$inject = ['$http', 'serviceConstants'];

    function providerService($http, serviceConstants) {
        let baseUrl = serviceConstants.baseUrl;

        return {
        	getProviderDetails,
        	getProviderLocationDetails,
        	updateProviderLocations
        };
        
        function getProviderDetails(providerId){
        	return $http.post(`${baseUrl}/providers/details`, providerId);
        }
        function getProviderLocationDetails(providerId){
        	return $http.post(`${baseUrl}/providers/locations/`, providerId);
        }
        function updateProviderLocations(providerLocations){
        	return $http.post(`${baseUrl}/providers/update/locations/`, providerLocations);
        }
        
    }
})();