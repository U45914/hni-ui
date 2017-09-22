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
        	deleteProviderLocation,
        	deactivateProviderLocation,
        	activateProviderLocation,
        	deleteProviderLocation
        	deleteProviderLocation,
        	createNewMenu,
        	createNewMenuItem,
        	getMenusForProvider,
        	getMenuItems
        };
        
        function getProviderDetails(providerId){
        	return $http.get(`${baseUrl}/providers/${providerId}/details`);
        }
        
        function deleteProviderLocation(providerId, providerLocationId){
        	return $http.delete(`${baseUrl}/providers/${providerId}/providerLocations/${providerLocationId}`);
        }
        
        function getProviderLocationDetails(providerId){
        	return $http.get(`${baseUrl}/providers/${providerId}/locations/`);
        }
        function updateProviderLocations(providerLocations){
        	return $http.post(`${baseUrl}/providers/update/locations/`, providerLocations);
        }
        
        function registerProvider(providerInfo) {
        	return $http.post(`${baseUrl}/providers/provider/create`, providerInfo);
        }
        
        function updateProvider(provider) {
        	return $http.post(`${baseUrl}/providers/provider/update`, provider);
        }
        
        function addProviderLocation(providerId, prividerLocationInfo) {
        	return $http.post(`${baseUrl}/providers/provider/${providerId}/location/add`, prividerLocationInfo);
        }
        
        function deactivateProviderLocation(providerLocation){
        	return $http.post(`${baseUrl}/providers/providerLocation/de-activate`, providerLocation);
        }
        
        function activateProviderLocation(providerLocation){
        	return $http.post(`${baseUrl}/providers/providerLocation/activate`, providerLocation);
        }
        
        function createNewMenu(menu) {
        	return $http.post(`${baseUrl}/menus/menu/create`, menu);
        }
        
        function createNewMenuItem(menuId, menuItem) {
        	return $http.post(`${baseUrl}/menus/${menuId}/menuitems/add`, menuItem);
        }
        
        function getMenusForProvider(providerId) {
        	return $http.get(`${baseUrl}/menus/providers/${providerId}`);
        }
        
        function getMenuItems(menuId) {
        	return $http.get(`${baseUrl}/menus/${menuId}/menuItems/info`);
        }
        function deleteProviderLocation(providerId, providerLocationId){
        	return $http.delete(`${baseUrl}/providers/${providerId}/${providerLocationId}/delete`);
        }
        
    }
})();