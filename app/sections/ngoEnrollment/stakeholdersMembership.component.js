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
	membershipController.$inject = ['$scope','toastService'];
	
	function membershipController($scope,toastService) {
		
		var memberObject = {};
		$scope.show = false;
		//$scope.memberList = [];

		$scope.addNewChoice = function() {
			memberObject = {};
			if($scope.name!= null && $scope.company!= null && $scope.name!= " " && $scope.company!= " "){
				memberObject.name = $scope.name;
				memberObject.company = $scope.company;
				$scope.memberList.push(memberObject);
				$scope.show = true;
				$scope.name = " ";
				$scope.company = " ";
			}
			else{
				toastService.showToast("Enter valid values in the fields");
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