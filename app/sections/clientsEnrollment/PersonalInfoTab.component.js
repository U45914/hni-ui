(function () {
  angular
      .module('app')
      
      .directive('personalInfoTab', personalInfoDirective)
	
	
	function personalInfoDirective() {
		return {
			scope : {
				
			},
			restrict : "E",
			templateUrl : "personalInfoTab.tpl.html",
			controller : personalInfoController,
			controllerAs: 'vm'
		}

	} 
  
  personalInfoController.$inject = ['$q','clientEnrollmentService','validateService','$rootScope','$scope']; 
  
  function personalInfoController ($q,clientEnrollmentService,$rootScope,validateService,$scope) {
	  var vm = this;
	 
	  vm.client = {};
	  vm.client.user = {};
	  vm.client.address = {};
	  
	  $scope.$on("data-loaded-client", function(obj) {
			vm.load();
		});
	  
	  vm.load = function() {
			vm.client = clientEnrollmentService.personnalData;
		}
	  
	  vm.save = function(){
		  debugger;
		  var data = {
					"firstName" : vm.client.user.firstName,
					"middleName" : vm.client.user.middleName,
					"lastName" : vm.client.user.lastName,
					"address" : {
						"name" : vm.client.name,
						"address1" : vm.client.address.address1,
						"address2" : vm.client.address.address2,
						"city" : vm.client.address.city,
						"state" : vm.client.address.state,
						"zip" : vm.client.address.zip,
					},
					"ethnicity" : vm.client.user.ethnicity,
					"phoneNumber" : vm.client.user.phoneNumber,
					"bday" : vm.client.bday,
					"beenArrested" : vm.client.beenArrested,
					"felony" : vm.client.user.felony
					};
	
		  /*vm.validatePersonalInfo = validateService.validateClientPersonalInfo(data);
		  if(vm.validateClientPersonalInfo == ""){
				vm.errorText = false;
				clientEnrollmentService.setPersonnalData(data);
				//var serviceCalls = clientEnrollmentService.savePartial();
				clientEnrollmentService.savePartial().then(function(response) {
					if (response && response.data && response.data.success) {
						alert(response.data.success)
						$rootScope.$broadcast("scroll-tab", [ 1, 2 ]);

					} else {
						alert("Failed to save client Personal Info entry");
					}
				});
			}
			else{
				vm.errorText = true;
			}return;*/
		  
				if (vm.user.ethnicity != null && vm.user.phoneNumber != null
						&& vm.client.bday != null) {
					var serviceCalls = clientEnrollmentService.setPersonnalData(data);
					//var serviceCalls = clientEnrollmentService.savePartial();
					$q.all(serviceCalls)// .then(onSuccess,onError);
					$rootScope.$broadcast("scroll-tab", [ 1, 2 ]);

				} else {
					window.alert("Please fill Fields");

					return false;
				}
	  }
	  }
  
 })();
        