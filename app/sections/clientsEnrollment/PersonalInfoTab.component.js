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
  
  personalInfoController.$inject = ['$q','clientEnrollmentService','$rootScope','$scope','validateService', 'validateFormData']; 
  
  function personalInfoController ($q,clientEnrollmentService,$rootScope,$scope,validateService,validateFormData) {
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
			console.log("data Returned : ");
			console.log(vm.client.address);
		}
	  
	  vm.save = function(){
		 // $scope.bday=parseInt(vm.client.bday);
		  var data = {
				  "user" : {
					  	"firstName" : vm.client.user.firstName,
						"lastName" : vm.client.user.lastName,
						//"ethnicity" : vm.client.user.ethnicity,
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
					"race"	: vm.client.race
					};
		  		
					var serviceCalls = clientEnrollmentService.setPersonnalData(data);
					var serviceCalls = clientEnrollmentService.savePartial();
					$q.all(serviceCalls)// .then(onSuccess,onError);
					$rootScope.$broadcast("scroll-tab", [ 1, 2 ]);

	  }
	  /*vm.checkPhoneNbr = function() {
			var phone = vm.client.user.mobilePhone;
			var patt = new RegExp("(?=.*[0-9])(?=.*[-]).{12}");
			var res = patt.test(phone);
			if (res == true) {
				vm.check=false;
			} else {
				vm.check=true;
			}
		};*/
		
		vm.validationCheck = function(type, id, value, event) {
			var data = validateFormData.validate(type, id, value, event);
			vm.fields[id] = data.field[id];
			vm.msgs[id] = data.msg[id];
		};
	  }
  
 })();
        