(function() {
	angular.module('app').component('agreementPolicy', {
		bindings : {

		},
		templateUrl : 'agreement-policy.tpl.html',
		controller : agreementPolicyController,
		controllerAs : 'vm'
	});
	
	agreementPolicyController.$inject = ['serviceConstants','$sce','$http', '$state', 'ngoOnboardingService', 'toastService'];
	
	function agreementPolicyController(serviceConstants,$sce,$http, $state, ngoOnboardingService, toastService){
		var vm = this;
		vm.buttonText = "Agree and Continue";
		debugger;
		console.log($state.data);
		vm.userData = $state.params.data;
		
		let baseUrl = serviceConstants.baseUrl;
	//	vm.isDisabled = false;
		// vm.resourceUrl = serviceConstants.resourceUrl+"/docs/HungerNotImpossiblePrivacyPolicy.pdf";
	
		// vm.resourceUrl = {src: serviceConstants.resourceUrl+"/docs/HungerNotImpossiblePrivacyPolicy.pdf"};
		
		 // var win = window.open(resourceUrl + "/docs/HungerNotImpossiblePrivacyPolicy.pdf", "_blank", strWindowFeatures);
		 
		 $http.get(`${baseUrl}/help/privacy/policy/pdf/`,{responseType: 'arraybuffer'})
		.then(function(response){
			var file = new Blob([response.data], {type: 'application/pdf'});
			var fileURL = URL.createObjectURL(file);
			vm.privacyPolicy = $sce.trustAsResourceUrl(fileURL);
		}); 
		 
		 
		 vm.acceptPolicy = function() {
			 ngoOnboardingService.registerUser(vm.userData).then(function(response) {
					if (response && response.data && response.data.success) {
						toastService.showToast(response.data.success)
						$state.go('login');
					} else {
						vm.buttonText = "Register";
						vm.isDisabled = false;
						toastService.showToast("Failed to create user entry");
					}
				});
		 }
		
			 
			 
	}
	
})();