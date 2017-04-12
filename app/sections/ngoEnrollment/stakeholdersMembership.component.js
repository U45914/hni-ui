(function() {
	angular.module('app')

	.directive('boardMember', boardMemberDirective)
	
	
	function boardMemberDirective() {
		return {
			scope : {
				memberList : "=list"
			},
			restrict : "E",
			templateUrl : "stakeholdersMembershipTemplate.tpl.html",
			controller : membershipController
		}

	}
	
	function membershipController($scope) {
		
		var memberObject = {};
		//$scope.memberList = [];

		$scope.addNewChoice = function() {
			memberObject = {};
			if($scope.name!= null && $scope.company!= null){
				memberObject.name = $scope.name;
				memberObject.company = $scope.company;
				$scope.memberList.push(memberObject);
				$scope.name = null;
				$scope.company = null;
				//console.log($scope.memberList);
			}
			else{
				alert("Enter values in text fields");
			}
		}
		
		$scope.deleteRow = function(idx) {
			$scope.memberList.splice(idx,1);
			//console.log( $scope.memberList);
		}
	}
	
})();