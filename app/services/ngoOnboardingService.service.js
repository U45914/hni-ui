(function() {
    angular
        .module('app')
        .factory('ngoOnboardingService', ngoOnboardingService);

    ngoOnboardingService.$inject = ['$http', 'serviceConstants', 'rolesConstant'];

    function ngoOnboardingService($http, serviceConstants, rolesConstant) {
        let baseUrl = serviceConstants.baseUrl;

        return {
        	inviteNgo,
        	registerUser,
            addNgoUser,
            checkUsernameAvailability
            
        };
        
        //Function to call post service while super admin add a new ngo
        function inviteNgo(data) {
            let postData = JSON.stringify(data);
            return $http.post(`${baseUrl}/onboard/ngo/invite`, postData);
        }
        
        //Function to call post service while super admin add a new ngo
        function addNgoUser(data) {
            let postData = JSON.stringify(data);
            return $http.post(`${baseUrl}/onboard/ngo/user/invite`, postData);
        }
        
        //Function to call post service while new ngo login to enroll in HNI.
        function registerUser(data) {
            let postData = JSON.stringify(data);
            console.log("inside service controller"+ postData);
            let config = {
            	    method: 'POST',
            	    url: `${baseUrl}/users/register`,
            	    data: postData,
            	    headers: {
            	        "user-type": window.localStorage.getItem("userType"),
            	        "invite-code": window.localStorage.getItem("activationCode")
            	        }
            	}
            return $http(config);
        }
        
        function checkUsernameAvailability(username) {
        	var usernameObject = {"username": username}
        	return $http.post(`${baseUrl}/onboard/validate/username`, usernameObject);
        }
     }
})();