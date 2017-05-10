(function() {
	angular
	.module('app')

	.directive('fundingMeal', fundingMealDirective)
	
	
	function fundingMealDirective() {
		return {
			scope : {
				mealDonaltionList : "=list"
			},
			restrict : "E",
			templateUrl : 'fundingMealTemplate.tpl.html',
			controller : fundingMealController
		}

	}
	fundingMealController.$inject = ['$scope','toastService'];
	
	function fundingMealController($scope,toastService) {
				
		var fundingMealObj ={};
		//$scope.mealDonaltionList =[];
		
		
		$scope.addNewChoice = function(){
			fundingMealObj = {};
			if($scope.source!=null && $scope.mealQty!=null && $scope.frequency!= null && $scope.source != " " && $scope.frequency != " "){
				fundingMealObj.source = $scope.source;
				fundingMealObj.mealQty = $scope.mealQty;
				fundingMealObj.frequency = $scope.frequency;
				$scope.mealDonaltionList.push(fundingMealObj);
				$scope.source = " ";
				$scope.mealQty = null;
				$scope.frequency = " ";
			}
			else{
				toastService.showToast(" Please enter valid values in the fields");
			}
		}
		
		$scope.deleteMeal = function(idx) {
			$scope.mealDonaltionList.splice(idx,1);
			if($scope.mealDonaltionList.length == 0){
				$scope.show = false;
			}
		}
	}
	
})();