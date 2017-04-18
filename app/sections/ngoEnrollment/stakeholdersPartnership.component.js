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
		//$scope.brandList = [];

		$scope.addNewRow = function() {
			brandObject = {};
			if( $scope.company!=null &&  $scope.phoneNumber != null){
			brandObject.company = $scope.company;
			brandObject.phoneNumber = $scope.phoneNumber;
			$scope.brandList.push(brandObject);
			$scope.company = null;
			$scope.phoneNumber = null;
			}
			else{
				alert("Please fill the fields");
			}
		}
		
		$scope.deleteBrand = function(idx) {
			$scope.brandList.splice(idx,1);
			console.log( $scope.brandList);
		}

	}
})();