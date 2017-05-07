(function() {
	angular
	.module('app')

	.directive('fundingSource', fundingSourceDirective)
	
	
	function fundingSourceDirective() {
		return {
			scope : {
				fundingSourceList : "=list",
			},
			restrict : "E",
			templateUrl : 'fundingSourceTemplate.tpl.html',
			controller : fundingSourceController
		}

	}
	
	function fundingSourceController($scope, validateFormData) {
				
		var fundingSourceObj ={};
				
		
		$scope.addNewChoice = function(){
			fundingSourceObj = {};
			var data = validateFormData.validate("text", "fundSource" ,$scope.source );
			$scope.fields = data.field;
			$scope.msgs = data.msg;
			if($scope.source!= null ) {
				fundingSourceObj.source = $scope.source;
				fundingSourceObj.amount = $scope.amount;
				$scope.fundingSourceList.push(fundingSourceObj);
				$scope.source = null;
				$scope.amount = null;
				}
		}
		
		$scope.deleteRow = function(idx) {
			$scope.fundingSourceList.splice(idx,1);
		}
	}
	
	
})();