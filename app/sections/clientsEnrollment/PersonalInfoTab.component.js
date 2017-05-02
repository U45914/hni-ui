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
  
  personalInfoController.$inject = ['$q','clientEnrollmentService','$rootScope','$scope','validateService']; 
  
  function personalInfoController ($q,clientEnrollmentService,$rootScope,$scope,validateService) {
	  var vm = this;
	 
	  vm.client = {};
	  vm.client.user = {};
	  vm.client.address = {};
	  vm.states = validateService.validateStateDrpdwn();
	 
	  $scope.$on("data-loaded-client", function(obj) {
			vm.load();
	 });
	  
	  vm.load = function() {
			vm.client = clientEnrollmentService.finalData;
			vm.client.bday = new Date(vm.client.bday);	
			console.log("data Returned : ");
			console.log(vm.client.address);
		}
	  
	  vm.save = function(){
		 // $scope.bday=parseInt(vm.client.bday);
		  var data = {
				  "user" : {
					  	"firstName" : vm.client.user.firstName,
						//"middleName" : vm.client.user.middleName,
						"lastName" : vm.client.user.lastName,
						//"ethnicity" : vm.client.user.ethnicity,
						"mobilePhone" : vm.client.user.mobilePhone,
				  },
					"address" : {
						"name" : vm.client.address.name,
						"address1" : vm.client.address.address1,
						"address2" : vm.client.address.address2,
						"city" : vm.client.address.city,
						"state" : vm.client.address.state,
						"zip" : vm.client.address.zip,
					},
					"bday" : vm.client.bday,
					"beenArrested" : vm.client.beenArrested,
					"beenConvicted" : vm.client.beenConvicted,
					"race"	: vm.client.race
					};
		  			console.log(parseInt(vm.client.bday));
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
		  
				if (/*vm.client.user.ethnicity != null &&*/ vm.client.user.mobilePhone != null
						&& vm.client.bday != null) {
					var serviceCalls = clientEnrollmentService.setPersonnalData(data);
					var serviceCalls = clientEnrollmentService.savePartial();
					$q.all(serviceCalls)// .then(onSuccess,onError);
					$rootScope.$broadcast("scroll-tab", [ 1, 2 ]);

				} else {
					window.alert("Please fill Fields");

					return false;
				}
	  }
	  }
  
 })();
        