(function(){
	angular
	.module('app')
	.directive('userList', userListDirective)
	
	function userListDirective() {
		return {
			restrict : "E",
			transclude : true,
			scope : {
				ds: "="
			},
			templateUrl : "user-list.tpl.html"
		}
		
	}
});