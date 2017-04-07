(function() {
	angular
	.module('app')

	.directive('fundingSource', fundingSourceDirective)
	
	
	function fundingSourceDirective() {
		return {
			scope : {
				fundingSourceList : "=list"
			},
			restrict : "E",
			templateUrl : 'fundingSourceTemplate.tpl.html',
			controller : fundingSourceController
		}

	}
	
	function fundingSourceController($scope) {
		console.log("funding source controller")
		
		var fundingSourceObj ={};
		$scope.fundingSourceList =[];
		$scope.addNewChoice = function(){
			fundingSourceObj = {};
			if($scope.source!= null && $scope.amount!= null) {
				fundingSourceObj.source = $scope.source;
				fundingSourceObj.amount = $scope.amount;
				$scope.fundingSourceList.push(fundingSourceObj);
				$scope.source = null;
				$scope.amount = null;
				}
			else{
				alert("please fill the fields");
			}
		}
		
		$scope.deleteRow = function(idx) {
			$scope.fundingSourceList.splice(idx,1);
			console.log( $scope.fundingSourceList);
		}
	}
	
	
})();