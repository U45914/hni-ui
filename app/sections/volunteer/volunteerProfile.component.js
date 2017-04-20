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
    
    volunteerProfileController.$inject = ['$q','volunteerService','$state'];
    
    function volunteerProfileController($q,volunteerService,$state){
    	var vm = this;
    	this.myDate = new Date();
    	  this.isOpen = false;
    	  
    	  
    	  vm.vol = volunteerService.getProfileInfo();
    	  var birthday = vm.vol.birthday;
    	  vm.vol.birthday = new Date(birthday); 
    	 

    	  vm.submit = function(){   
    	   		 var data = {
    	   			 	"firstName" : vm.vol.firstName,
    	   			 	"lastName" : vm.vol.lastName,
    	   			 	"address" : {
    	   			 				"name": vm.vol.address.name,
    	   			 				"address1" : vm.vol.address.address1,
    	   			 				"address2" : vm.vol.address.address2,
    	   			 				"city" : vm.vol.address.city,
    	   			 				"state": vm.vol.address.state,
    	   			 				"zip" : vm.vol.address.zip
    	   			 				},
    	   			 	"phoneNumber" : vm.vol.phoneNumber,
    	   			 	"email" : vm.vol.email,
    	   			 	"birthday" : vm.vol.birthday,
    	   			 	"sex" : vm.vol.sex,
    	   			 	"race" : vm.vol.race,
    	   			 	"education" : vm.vol.education,
    	   			 	"maritalStatus" : vm.vol.maritalStatus,
    	   			 	"income" : vm.vol.income,
    	   			 	"kids" : vm.vol.kids,
    	   			 	"employer" : vm.vol.employer,
    	   			 	"nonProfit" : vm.vol.nonProfit

    	   		};
    	   		
    	   		if(vm.vol.firstName!=null && vm.vol.lastName !=null && vm.vol.address.name!=null && vm.vol.address.address1!=null &&  vm.vol.address.address2!=null && vm.vol.address.city!=null &&  vm.vol.address.state!=null &&  vm.vol.address.zip!=null && vm.vol.phoneNumber !=null && vm.vol.email !=null && vm.vol.birthday !=null && vm.vol.sex !=null){
    	   		 volunteerService.volunteerProfileData = data; 
    	   		 var serviceCalls = volunteerService.profileDetails(data).then(
							function successCallback(response) {
								debugger;
								console.log("Response : ");
								console.log(response);
								if (response
										&& response.status
										&& response.statusText == "OK") {
									alert("Your request has been submitted")
									$state.go('dashboard');
								} else {
									alert("Failed : "
											+ response.data.errorMsg);
								}
							},
							function errorCallback(response) {
								debugger;
								alert("Something went wrong, please try again")
								// $state.go('dashboard');
							});
    	   
			return $q.all(serviceCalls);
		}
    	 
    	  }
    			 
    }
})();