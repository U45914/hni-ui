(function() {
    angular
        .module('app')
        .factory('volunteerService', volunteerService);

    volunteerService.$inject = ['$http', 'serviceConstants'];

    function volunteerService($http, serviceConstants) {
        let baseUrl = serviceConstants.baseUrl;
        var volunteerProfileData;
        
        return {
        	profileDetails,
            volunteerProfileData,
            inviteVolunteer,
            registerVolunteer,
            volunteerTimeAvailability
            };
        
            function profileDetails(data) {
           	 let postData = JSON.stringify(data);
           	 console.log("DATA : "+postData);
                return $http.post(`${baseUrl}/users/volunteer/save`, postData)
                .then(function successCallback(response) {
                   console.log(response.data);
                	// success(response);
                }, function errorCallback(error) {
                    failure(error);
                });
           	
           	// return volunteerProfileData;
           }  
            
          //Function to call post service while super admin add a new volunteer
            function inviteVolunteer(data) {
                let postData = JSON.stringify(data);
                return $http.post(`${baseUrl}/onboard/volunteer/user/invite`, postData);
            }
            
            
          //Function to call post service while new volunteer login to enroll in HNI.
            function registerVolunteer(data) {
                let postData = JSON.stringify(data);
                console.log("inside service controller"+ postData);
                let config = {
                	    method: 'POST',
                	    url: `${baseUrl}/users/register`,
                	    data: postData,
                	    headers: {
                	        "user-type": window.localStorage.getItem("userType")
                	    }
                	}
                return $http(config);
            }
            function volunteerTimeAvailability(data) {
                let postData = JSON.stringify(data);
                console.log("Time Availabilty : "+ postData);
               
            }
        
            function getProfileData(){
            	return $http.get(`${baseUrl}/user/volunteer/profile`).then(function(response){
            		if(response || response.data){
            			volunteerProfileData = response.data;
            		}
            	});
            }
            
          }
}
)();
