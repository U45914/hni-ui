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
			
	FundingTabController.$inject = ['$q','ngoEnrollmentService','$scope'];
	
	function FundingTabController($q,ngoEnrollmentService,$scope){
		var ft = this;
		ft.fundingSourceList = [];
		ft.mealDonaltionList = [];
		ft.mealFundingList = [];
		
		
		
		ft.save = function(){
			var data = { 
					"fundingSource" :  ft.fundingSourceList,
					"mealDonation " : ft.mealDonaltionList,
					"mealFunding ": ft.mealFundingList
			};
   		 	console.log(data);
   		 	if(ft.mealDonaltionList.length!=0){
   		 		var serviceCalls = ngoEnrollmentService.postFundingList(data);
   		 		return $q.all(serviceCalls);
   		 	}
   		 	else{
   		 		alert("Meal Donation fields are mandatory to save");
   		 	}
		}
	}
})();
