(function () {
  angular
      .module('app')
        .component('superUserProfile', {
          bindings: {

          },
          templateUrl: 'superUserProfile.tpl.html',
          controller: superUserProfileController,
          controllerAs: 'vm'
        }) ;
  
  		superUserProfileController.$inject = [ '$q', 'superUserProfileService',
  							'$scope', '$state', 'toastService', 'validateFormData' ,'$rootScope'];

  			function superUserProfileController($q, superUserProfileService, $scope, $state, 
  					toastService, validateFormData,$rootScope) {
  				
  				 var vm = this;
  				 vm.profile ={};
  				 vm.userId =   $rootScope.userId ;
  				 vm.buttonText = "Save";
  				 vm.isEmaildisabled = true;
  				 vm.isDisabled =true;
  				 
  				vm.fields = {
  						"name" : true,
  						"lname" : true,
  						"phone" : true,
  						"email" : true
  						
  				};
  				vm.msgs = {};
  				
  				 superUserProfileService.getSuperUserProfileData(vm.userId ).then(
							function successCallback(response) {
							
								vm.firstName = response.data.firstName;
								vm.lastName  = response.data.lastName;
								vm.phoneNumber = response.data.mobilePhone;
								vm.email = response.data.email;
								vm.isDisabled = false;
								
							});
  				 
  				
  				
  				
  				vm.validationCheck = function(type, id, value, event) {
  					var data = validateFormData.validate(type, id, value, event);
  					vm.fields[id] = data.field[id];
  					vm.msgs[id] = data.msg[id];
  				}
  				
  			vm.save = function(){
  				
  				var doNotPost =false;
  				if(vm.firstName == null || vm.lastName == null ||vm.phoneNumber == null){
  					doNotPost =true;	
  				}
  				
  				
  				if (!doNotPost) {
  					vm.buttonText = "Please wait...";
  					vm.isDisabled = true;
  					
  				var data = {
  					"firstName"   : vm.firstName,
  					"lastName"    : vm.lastName,
  					"mobilePhone" : vm.phoneNumber
  				}
  				
  				superUserProfileService.updateSuperUserProfileData(data).then(
  						function successCallback(response) {
  							if (response && response.data && response.status == "200") {
  							toastService.showToast("profile updated ")
  							
  							}else{
  								toastService.showToast("profile updation failed ")
  							}
  						});
  				}else{
  					toastService.showToast("Please complete all the fields");
  				}
  				
  				vm.buttonText = "save";
					vm.isDisabled = false;
  				
  			}
  			
	
        }
  
  })();