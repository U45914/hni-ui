(function() {
    angular
        .module('app')
        .factory('gridService', gridService);

    gridService.$inject = ['$http','serviceConstants'];

    function gridService($http,serviceConstants) {
    	let baseUrl = serviceConstants.baseUrl;
        return {
        	activation: activation,
        	activateUser : activateUser,
        	sheltered : sheltered,
        	shelteredMultiple : shelteredMultiple,
        	deletion : deletion,
        	deleteProvider : deleteProvider,
        	deleteMultiple : deleteMultiple,
        	getGridDataFor: getGridDataFor,
        	saveParticipant : saveParticipant,
        	activateProviders : activateProviders
        };

        function activation(data, value) {
        	if(!value)
        		return $http.post(`${baseUrl}/configure/users/activate`, data);
        	else
        		return $http.post(`${baseUrl}/configure/users/de-activate`, data);
        }
        
        function activateUser(data, value) {
        	if(!value)
        		return $http.post(`${baseUrl}/configure/user/activate`, data);
        	else
        		return $http.post(`${baseUrl}/configure/user/de-activate`, data);
        }
        
        function sheltered(data, value) {
        	if(!value)
        		return $http.post(`${baseUrl}/configure/user/sheltered`, data);
        	else
        		return $http.post(`${baseUrl}/configure/user/un-sheltered`, data);
        }
        function getGridDataFor(report) {
        	return $http.get(`${baseUrl}/reports/view/`+report);
        }
        function shelteredMultiple(data, value) {
        	console.log("Submit mutiple record!");
        }
        
        function deletion(id) {
        	return $http.post(`${baseUrl}/configure/user/delete`, id);
        }
        
        function deleteMultiple(id) {
        	return $http.post(`${baseUrl}/configure/users/delete`, id);
        }
        
        function saveParticipant(data){
        	return $http.post(`${baseUrl}/configure/user/participant/save`, data);
        }
        
        function deleteProvider(data){
        	return $http.post(`${baseUrl}/providers/provider/delete`,data);
        }
        
        function activateProviders(data, value){
        	return $http.post(`${baseUrl}/providers/activate/provider/${value}`,data);
        }
        
    }
})();