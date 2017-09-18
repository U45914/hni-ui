(function() {
    angular
        .module('app')
        .factory('providerService', providerService);

    providerService.$inject = ['$http', 'serviceConstants', '$timeout'];

    function providerService($http, serviceConstants, $timeout) {
        let baseUrl = serviceConstants.baseUrl;

        return {
        	getProviderDetails,
        	getProviderLocationDetails,
        	updateProviderLocations,
        	registerProvider,
        	updateProvider,
        	addProviderLocation,
        	deleteProviderLocation
        };
        
        function getProviderDetails(providerId){
        	return $http.post(`${baseUrl}/providers/details`, providerId);
        }
        
        function deleteProviderLocation(providerId, providerLocationId){
        	return $http.delete(`${baseUrl}/providers/${providerId}/providerLocations/${providerLocationId}`);
        }
        
        function getProviderLocationDetails(providerId){
        	return $http.post(`${baseUrl}/providers/locations/`, providerId);
        }
        function updateProviderLocations(providerLocations){
        	return $http.post(`${baseUrl}/providers/update/locations/`, providerLocations);
        }
        
        function registerProvider(providerInfo) {
        	return $http.post(`${baseUrl}/providers/provider/create`, providerInfo);
        }
        
        function updateProvider(providerInfo) {
        	return $http.post(`${baseUrl}/providers/provider/update`, providerInfo);
        }
        
        function addProviderLocation(providerId, prividerLocationInfo) {
        	return $http.post(`${baseUrl}/providers/provider/${providerId}/location/add`, prividerLocationInfo);
        }
        
    }
})();