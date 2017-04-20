(function() {
    angular
        .module('app')
        .component('volunteerProfile', {
        	bindings: {

            },
            templateUrl: 'volunteerProfile.tpl.html',
            controller: volunteerProfileController,
            controllerAs: 'vm'
        });
    
    volunteerProfileController.$inject = ['$q','volunteerService'];
    
    function volunteerProfileController($q,volunteerService){
    	var vm = this;
    	this.myDate = new Date();
    	  this.isOpen = false;
    	  
    	  //vm.vol = volunteerService.volunteerProfileData;
    	//  volunteerService.getProfileInfo();
    	 // console.log("Controller : "+vm.vol);
    	  
/*vm.volunteer = {
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
	};*/
//vm.vol =  volunteerService.profileDetails();
console.log("volunteerService.volunteerProfileData ");
console.log(volunteerService.volunteerProfileData);
    	  vm.submit = function(){   
    		  debugger;
    	   		 var data = {
    	   			 	"firstName" : vm.vol.firstName,
    	   			 	"lastName" : vm.vol.lastName,
    	   			 	"address" : {
    	   			 		"name": vm.vol.name,
	    	   			 	"address1" : vm.vol.address1,
	    	   			 	"city" : vm.vol.city,
	    	   			 	"state": vm.vol.state,
	    	   			 	"zip" : vm.vol.zip,
    	   			 	},
    	   			 	"phoneNumber" : vm.vol.phoneNumber,
    	   			 	"email" : vm.vol.email,
    	   			 	"birthday" : vm.vol.birthDate,
    	   			 	"sex" : vm.vol.sex,
	    	   			"race": vm.vol.race,
	    	   		    "education": vm.vol.highestLLevelOfEducationCompleted,
	    	   		    "maritalStatus": vm.vol.maritalStatus,
	    	   		    "income": vm.vol.income,
	    	   		    "kids": vm.vol.kids,
    	   			 	"employer" : vm.vol.employer,
    	   			 	"nonProfit" : vm.vol.nonProfit

    	   		};
    	   		
    	   		//if(vm.vol.firstName!=null && vm.vol.lastName !=null && vm.vol.address!=null && vm.vol.phoneNumber !=null && vm.vol.email !=null && vm.vol.birthDate !=null && vm.vol.sex !=null){
    	   		 volunteerService.volunteerProfileData = data; 
    	   		 var serviceCalls = volunteerService.profileDetails(data);
    			 return $q.all(serviceCalls);
    	   		/*}
    	   		else{
    	   			console.log("Failed");
    	   		}*/
    	  }
    			 
    }
})();