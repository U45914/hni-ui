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
        	registerProvider,
        	updateProviderLocations,
        	updateProvider,
        	addProviderLocation
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
        function updateProvider(provider){
        	return $http.post(`${baseUrl}/providers/update/details/`, provider);
        }
        
        function registerProvider(providerInfo) {
        	return $http.post(`${baseUrl}/providers/provider/create`, providerInfo);
        	/*var providerResponse = {
        			data:{
        				id: 1,
        				name: "Subway",
        				websiteUrl: "www.subway.com",
        				address: {
        					address1: "Test Address",
        					address2: "Test Address 2",
        					city: "Test City",
        					state: "MO"
        				}
        			}
        	}
        	
        	 return $timeout(function() {
        		 return {
        			 "data": providerResponse
        		 	};
        	    }, 1000);*/
        }
        
        function updateProvider(providerInfo) {
        	// return $http.post(`${baseUrl}/providers/provider/create`,
			// providerInfo);
        	var providerResponse = {
        			data:{
        				id: 1,
        				name: "Subway",
        				websiteUrl: "www.subway.com",
        				address: {
        					address1: "Test Address",
        					address2: "Test Address 2",
        					city: "Test City",
        					state: "MO"
        				}
        			}
        	}	
        	 return $timeout(function() {
        		 return {
        			 "data": providerResponse
        		 	};
        	    }, 1000);
        }
        
        function addProviderLocation(providerId, prividerLocationInfo) {
        	return $http.post(`${baseUrl}/providers/provider/${providerId}/location/add`, prividerLocationInfo);
        }
        
    }
})();