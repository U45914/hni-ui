(function(){
	angular.module('app')
	.directive('brandPartners', brandPartnerDirective)
	
	function brandPartnerDirective() {
		return {
			scope : {
				brandList : "=list"
			},
			restrict : "E",
			templateUrl : "stakeholdersPartnershipTemplate.tpl.html",
			controller : partnershipController,
			controllerAs : 'vm'
		}

	}
	partnershipController.$inject = ['$scope','toastService','validateFormData'];
	
	function partnershipController($scope,toastService,validateFormData) {
		var vm=this;
		var brandObject = {};
		vm.fields = {};
		vm.msgs = {};

		$scope.addNewRow = function() {
			brandObject = {};
			if( $scope.company!=null &&  $scope.website != null && $scope.check != true && $scope.company != " " && $scope.website != " "){
			brandObject.company = $scope.company;
			brandObject.website = $scope.website;
			$scope.brandList.push(brandObject);
			$scope.company = " ";
			$scope.website = " ";
			}
			else{
				toastService.showToast("Please enter valid values in the fields");
			}
		}
		
		$scope.deleteBrand = function(idx) {
			$scope.brandList.splice(idx,1);
		}
		
	/*	$scope.checkPhoneNbr = function() {
			var phone = $scope.phoneNumber;
			if (phone != null && phone.indexOf("-") == -1 && phone.length > 4)
		      {
				$scope.phoneNumber = phone.substring(0,3) + "-" + phone.substring(3,6) + "-" + phone.substring(6,10);
		      }  
		};*/
		
		$scope.validationCheck = function(type, id, value, event) {
			var data = validateFormData.validate(type, id, value, event);
			vm.fields[id] = data.field[id];
			vm.msgs[id] = data.msg[id];
		}

	}
})();