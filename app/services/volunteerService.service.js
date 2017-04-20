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
            getProfileInfo
            };
        
            function profileDetails(data) {
           	 let postData = JSON.stringify(data);
           	 console.log("DATA : "+postData);
                return $http.post(`${baseUrl}/onboard/volunteer/save`, postData);
           	
           	//return volunteerProfileData;
           }  
        
        function getProfileInfo() {
      	  debugger;
        	var volunteer = {
        		    "firstName": "qwe",
        		    "lastName": "asd",
        		    "address" : {
        		    			"name":"home Name",
        		    			"address1": "abcd",
        		    			"address2":"address2",
        		    			"city":"thrissur",
        		    			"state":"KL",
        		    			"zip":678654
        		    			},
        		    "phoneNumber": 1234,
        		    "email": "xxx@yyy.com",
        		    "birthday": "2017-01-13T18:30:00.000Z",
        		    "sex": "F",
        		    "race": 1,
        		    "education": 1,
        		    "maritalStatus": 1,
        		    "income": 1,
        		    "kids": 0,
        		    "employer": "qwe",
        		    "nonProfit": "N"
        		};
        	
        	volunteerProfileData = volunteer;
        	return volunteerProfileData;
        }
   }
}
)();
