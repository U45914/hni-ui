(function() {
    angular
        .module('app')
        .factory('clientEnrollmentService', clientEnrollmentService);

    clientEnrollmentService.$inject = ['$http', 'serviceConstants'];

    function clientEnrollmentService($http, serviceConstants) {
        let baseUrl = serviceConstants.baseUrl;
        var clientProfileData;
        
        return {
        	//profileDetails,
        	setPersonnalData,
           // getProfileInfo
            };
        
            function setPersonnalData(data) {
           	 let postData = JSON.stringify(data);
           	 console.log("client DATA : "+postData);
           	 
             //   return $http.post(`${baseUrl}/onboard/volunteer/save`, postData);
           	
           	//return volunteerProfileData;
           }  
        
      
   }
}
)();
