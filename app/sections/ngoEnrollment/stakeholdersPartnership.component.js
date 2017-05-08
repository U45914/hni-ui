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
			controller : partnershipController
		}

	}
	
	function partnershipController($scope) {
		
		var brandObject = {};
		

		$scope.addNewRow = function() {
			brandObject = {};
			if( $scope.company!=null &&  $scope.phoneNumber != null && $scope.check != true){
			brandObject.company = $scope.company;
			brandObject.phoneNumber = $scope.phoneNumber;
			$scope.brandList.push(brandObject);
			/*$scope.company = null;
			$scope.phoneNumber = null;*/
			}
			else{
				alert("Please fill the fields");
			}
		}
		
		$scope.deleteBrand = function(idx) {
			$scope.brandList.splice(idx,1);
		}
		
		$scope.checkPhoneNbr = function() {
			var phone = $scope.phoneNumber;
			var patt = new RegExp("(?=.*[0-9])(?=.*[-]).{12}");
			var res = patt.test(phone);
			if (res == true) {
				$scope.check=false;
			} else {
				$scope.check=true;
			}
		};

	}
})();