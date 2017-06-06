(function() {
	angular.module('app').directive('fundingTab', fundingrDirective)

	function fundingrDirective() {
		return {
			scope : {
				
			},
			restrict : "E",
			templateUrl : "fundingTab.tpl.html",
			controller : FundingTabController,
			controllerAs : 'ft'
		}
	}

	FundingTabController.$inject = [ '$q', 'ngoEnrollmentService',
			'$rootScope', '$scope','toastService' ];

	function FundingTabController($q, ngoEnrollmentService, $rootScope, $scope,toastService) {
		var ft = this;
		ft.fundingSourceList = [];
		ft.mealDonaltionList = [];
		ft.mealFundingList = [];
		
		$scope.$on("data-loaded-ngo", function(obj) {
			ft.load();
		});
		
		ft.load = function() {
		if (ngoEnrollmentService.fundingData) {
			ngoEnrollmentService.setFundingData(ngoEnrollmentService.fundingData);
			ft.fundingSourceList = ngoEnrollmentService.fundingData["fundingSource"];
			ft.mealDonaltionList = ngoEnrollmentService.fundingData["mealDonation"];
			ft.mealFundingList = ngoEnrollmentService.fundingData["mealFunding"];

		}
		}
		ft.save = function(isTopTabClicked) {
			var data = {
				"fundingSource" : ft.fundingSourceList,
				"mealDonation" : ft.mealDonaltionList,
				"mealFunding" : ft.mealFundingList
			};

				ngoEnrollmentService.setFundingData(data);
				var serviceCalls = ngoEnrollmentService.savePartial();
				$q.all(serviceCalls)// .then(onSuccess,onError);

				if(!isTopTabClicked){
					$rootScope.$broadcast("scroll-tab", [ 1, 2 ]);
				}
		}
		
		$rootScope.$on("tabFocusChangedFromTabFour", function(event, data){			
			ft.save(true);
		})
	}
})();
