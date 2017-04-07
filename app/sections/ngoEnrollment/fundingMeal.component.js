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
	
	function fundingMealController($scope) {
		
		console.log("funding meal controller")
		
		var fundingMealObj ={};
		$scope.mealDonaltionList =[];
		$scope.addNewChoice = function(){
			fundingMealObj = {};
			if($scope.source!=null && $scope.mealQty!=null && $scope.frequency!= null){
				fundingMealObj.source = $scope.source;
				fundingMealObj.mealQty = $scope.mealQty;
				fundingMealObj.frequency = $scope.frequency;
				$scope.mealDonaltionList.push(fundingMealObj);
				$scope.source = null;
				$scope.mealQty = null;
				$scope.frequency = null;
			}
			else{
				alert("please fill the Fields");
			}
		}
		
		$scope.deleteMeal = function(idx) {
			$scope.mealDonaltionList.splice(idx,1);
			console.log( $scope.mealDonaltionList);
		}
	}
	
})();