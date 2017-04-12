(function(){
	angular
		.module('app')
		.directive('fundingTab', fundingrDirective)
	
	
	function fundingrDirective() {
		return {
			scope : {
				
			},
			restrict : "E",
			templateUrl : "fundingTab.tpl.html",
			controller : FundingTabController,
			 controllerAs: 'ft'
		}
	}
			
	FundingTabController.$inject = ['$q','ngoEnrollmentService', '$rootScope','$scope',];
	
	function FundingTabController($q,ngoEnrollmentService,$rootScope, $scope){
		var ft = this;
		ft.fundingSourceList = [];
		ft.mealDonaltionList = [];
		ft.mealFundingList = [];
		
		ft.fundingSourceList = ngoEnrollmentService.fundingData["fundingSource"]; 
		ft.mealDonaltionList = ngoEnrollmentService.fundingData["mealDonation"];
		ft.mealFundingList = ngoEnrollmentService.fundingData["mealFunding"];
		
		ft.save = function(){
			var data = { 
					"fundingSource" :  ft.fundingSourceList,
					"mealDonation " : ft.mealDonaltionList,
					"mealFunding ": ft.mealFundingList
			};
			//vm.tabIndex = 0;
   		 	if(ft.mealDonaltionList.length!=0){
   		 		//var serviceCalls = ngoEnrollmentService.postFundingList(data);
   		 		//return $q.all(serviceCalls);
   		 		$rootScope.$broadcast("scroll-tab", [1,2]);
   		 
   		 	 ngoEnrollmentService.fundingData = data;
   		 	 var serviceCalls = ngoEnrollmentService.postFundingList(data);
   		 		return $q.all(serviceCalls);
   		 	}
   		 	else{
   		 		alert("Meal Donation fields are mandatory to save");
   		 	}
		}
	}
})();
