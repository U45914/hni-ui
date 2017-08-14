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
        	deleteMultiple : deleteMultiple 
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
        		return $http.post(`${baseUrl}/configure/user/unsheltered`, data);
        	else
        		return $http.post(`${baseUrl}/configure/user/sheltered`, data);
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
        
    }
})();