(function() {
	angular
	 .module('app')
	  .directive('stakeholdersTab', stakeholderDirective)
	
	
	function stakeholderDirective() {
		return {
			scope : {
				
			},
			restrict : "E",
			templateUrl : "stakeholdersTab.tpl.html",
			controller : StakeHolderTabController,
			 controllerAs: 'shtc'
		}
	}
		
	StakeHolderTabController.$inject = ['$q','ngoEnrollmentService','$scope','$rootScope'];
	
	function StakeHolderTabController($q,ngoEnrollmentService ,$scope,$rootScope){
		var shtc = this;
		shtc.boardMainList = [];
		shtc.brandPartnersList = [];
		shtc.localPartnersList= [];
		
		
		shtc.save = function(){
			var data = { 
					"boardMembers" :  shtc.boardMainList,
					"brandPartners " : shtc.brandPartnersList,
					"localPartners ": shtc.localPartnersList
			};
			 ngoEnrollmentService.stakeHolderData = data;
				$rootScope.$broadcast("scroll-tab", [1,2]);
  	   		var serviceCalls = ngoEnrollmentService.postStakeholdersList(data);
  	   		return $q.all(serviceCalls);
  	   
		}
	}

})();