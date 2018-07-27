(function() {
    angular
        .module('app')
        .factory('superUserProfileService', superUserProfileService);
    
    
    superUserProfileService.$inject = ['$http', 'serviceConstants'];

    function superUserProfileService($http, serviceConstants) {
        let baseUrl = serviceConstants.baseUrl;
        
       return{
    	   getSuperUserProfileData,
    	   updateSuperUserProfileData
       }
       
        function getSuperUserProfileData(id){
        	return $http.get(`${baseUrl}/users/`+id)
        }
        
        function updateSuperUserProfileData(profileData){
        	return $http.post(`${baseUrl}/users/update/superuserprofile`,profileData)
        }
        
    }
    
})();    