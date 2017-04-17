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
        	return volunteerProfileData;
        }
        
        function getProfileInfo() {
      	  debugger;
        	var volunteer = {
        		    "firstName": "qwe",
        		    "lastName": "asd",
        		    "address": "abcd",
        		    "phoneNumber": 1234,
        		    "email": "xxx@yyy",
        		    "birthDate": "2017-04-13T18:30:00.000Z",
        		    "sex": "F",
        		    "race": "x",
        		    "highestLLevelOfEducationCompleted": "B-Tech",
        		    "maritalStatus": "Single",
        		    "income": "10k-15k",
        		    "kids": 0,
        		    "employer": "qwe",
        		    "nonProfit": "N"
        		};
        	
        	volunteerProfileData = volunteer;
        }
    }
}
)();
