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
  
  personalInfoController.$inject = ['$q','clientEnrollmentService','$rootScope','$scope','validateService', 'validateFormData','toastService']; 
  
  function personalInfoController ($q,clientEnrollmentService,$rootScope,$scope,validateService,validateFormData, toastService) {
	  var vm = this;
	 
	  vm.client = {};
	  vm.client.user = {};
	  vm.client.address = {};
	  vm.states = validateService.validateStateDrpdwn();
	 
	  vm.fields = {};
	 vm.msgs = {};
	  $scope.$on("data-loaded-client", function(obj) {
			vm.load();
	 });
	  
	  vm.load = function() {
			vm.client = clientEnrollmentService.finalData;
			vm.client.bday = new Date(vm.client.bday);	
			clientEnrollmentService.setPersonnalData(vm.getDataModel(vm.client));
		}
	  
	  vm.save = function(isTopTabClicked){
		 // $scope.bday=parseInt(vm.client.bday);
		  var data = vm.getDataModel(vm.client);
		  /*		console.log(data);
		 	if (vm.client.user.ethnicity != null && vm.client.user.mobilePhone != null
						&& vm.client.bday != null) {*/
					var serviceCalls = clientEnrollmentService.setPersonnalData(data);
					var serviceCalls = clientEnrollmentService.savePartial();
					$q.all(serviceCalls)// .then(onSuccess,onError);

					if(!isTopTabClicked){
						$rootScope.$broadcast("scroll-tab", [ 1, 2 ]);
					}
					

				/*} else {
					toastService.showToast("Please fill Fields");

					return false;
				}*/
	  }
	  
	  vm.getDataModel = function(client) {
		  if(vm.client){
			  var data = {
					  "user" : {
						  	"firstName" : vm.client.user.firstName,
							"lastName" : vm.client.user.lastName,
							
							"mobilePhone" : vm.client.user.mobilePhone,
					  },
						"address" : {
							"name" : "home",
							"address1" : vm.client.address.address1,
							"address2" : vm.client.address.address2,
							"city" : vm.client.address.city,
							"state" : vm.client.address.state,
							"zip" : vm.client.address.zip,
						},
						"bday" : vm.client.bday,
						"beenArrested" : vm.client.beenArrested,
						"beenConvicted" : vm.client.beenConvicted,
						"race"	: 0,
						"ethnicity" : vm.client.ethnicity
			  };
			  console.log(data);
			  return data;
		  }
	  }
	  
		vm.validationCheck = function(type, id, value, event) {
			var data = validateFormData.validate(type, id, value, event);
			vm.fields[id] = data.field[id];
			vm.msgs[id] = data.msg[id];
		};
		
		$rootScope.$on("saveTabOne", function(event, data){			
			vm.save(true);
		})
		
	  }
  
 })();
        