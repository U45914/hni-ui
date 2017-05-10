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
	
	fundingSourceController.$inject = ['$scope' ,'validateFormData','toastService'];
	function fundingSourceController($scope, validateFormData,toastService) {
				
		var fundingSourceObj ={};
				
		
		$scope.addNewChoice = function(){
			fundingSourceObj = {};
			var data = validateFormData.validate("text", "fundSource" ,$scope.source );
			$scope.fields = data.field;
			$scope.msgs = data.msg;
			if($scope.source!= null && $scope.source != " " ) {
				fundingSourceObj.source = $scope.source;
				fundingSourceObj.amount = $scope.amount;
				$scope.fundingSourceList.push(fundingSourceObj);
				$scope.source = " ";
				$scope.amount = null;
				}else
				{
				toastService.showToast(" Please enter valid values in the fields");
			}
		}
		
		$scope.deleteRow = function(idx) {
			$scope.fundingSourceList.splice(idx,1);
		}
	}
	
	
})();