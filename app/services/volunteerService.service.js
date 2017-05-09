(function() {
    angular
        .module('app')
        .factory('volunteerService', volunteerService);

    volunteerService.$inject = ['$http', 'serviceConstants','toastService'];

    function volunteerService($http, serviceConstants,toastService) {
        let baseUrl = serviceConstants.baseUrl;
        var volunteerProfileData;
        
        return {
        	profileDetails,
            volunteerProfileData,
            inviteVolunteer,
            registerVolunteer,
            saveVolunteerTimeAvailability,
            getProfileData,
            getVolunteerTimeAvailability
            };
        
            function profileDetails(data) {
           	 let postData = JSON.stringify(data);
                return $http.post(`${baseUrl}/users/volunteer/save`, postData)
                .then(function successCallback(response) {
                   console.log(response.data);
                   if (response
							&& response.data.response
							&& response.data.response == "success") {
						toastService.showToast("Your profile has been saved");
                   }
                   else if(response && response.data.response && response.data.response == "error"){
						toastService.showToast("Error : " +response.data.errorMsg);
					}
                   else if(response && response.data && !response.data.errorMsg){
                	   toastService.showToast("Something went wrong. Try again later");
                   }
                   else {
						toastService.showToast("Failed : " + response.data.errorMsg);
					}
                	// success(response);
                }, function errorCallback(error) {
                    failure(error);
                	toastService.showToast("Something went wrong, please try again");
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
            function saveVolunteerTimeAvailability(data) {
                let postData = JSON.stringify(data);
                return $http.post(`${baseUrl}/users/volunteer/availability/save`, postData)
                .then(
		  				function successCallback(response) {
		  					if (response && response.status && response.statusText == "OK") {
		  						toastService.showToast("Your time availability has been saved")
		  						
		  					} else if(response && response.data && !response.data.errorMsg){
			                	   toastService.showToast("Something went wrong. Try again later");
			                   }
		  					else {
		  						toastService.showToast("Failed : "+ response.data.errorMsg);
		  					}
		  				},
		  				function errorCallback(response) {
		  					toastService.showToast("Something went wrong, please try again")
		  				});
               
            }
            
            function getVolunteerTimeAvailability(){
            	return $http.get(`${baseUrl}/users/volunteer/availability`)
            }
        
            function getProfileData(){
            	return $http.get(`${baseUrl}/users/volunteer/profile`);
            }
            
          }
}
)();
