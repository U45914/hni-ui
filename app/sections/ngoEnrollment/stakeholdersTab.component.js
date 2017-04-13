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
		
		shtc.boardMainList = ngoEnrollmentService.stakeHolderData["boardMembers"]; 
		shtc.brandPartnersList = ngoEnrollmentService.stakeHolderData["brandPartners"];
		shtc.localPartnersList = ngoEnrollmentService.stakeHolderData["localPartners"];
		
		shtc.save = function(){
			var data = { 
					"boardMembers" :  shtc.boardMainList,
					"brandPartners" : shtc.brandPartnersList,
					"localPartners": shtc.localPartnersList
			};
			 ngoEnrollmentService.setStakeHolderData(data);
			 var serviceCalls = ngoEnrollmentService.savePartial();
	  		 $q.all(serviceCalls)//.then(onSuccess,onError);
			 $rootScope.$broadcast("scroll-tab", [1,2]);
  	   		}
	}

})();