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
		$scope.show = false;
		//$scope.memberList = [];

		$scope.addNewChoice = function() {
			memberObject = {};
			if($scope.name!= null && $scope.company!= null){
				memberObject.name = $scope.name;
				memberObject.company = $scope.company;
				$scope.memberList.push(memberObject);
				$scope.show = true;
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
			if($scope.memberList.length == 0){
				$scope.show = false;
			}
			//console.log( $scope.memberList);
		}
	}
	
})();