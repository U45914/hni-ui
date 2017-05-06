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
			'$rootScope', '$scope', ];

	function FundingTabController($q, ngoEnrollmentService, $rootScope, $scope) {
		var ft = this;
		ft.fundingSourceList = [];
		ft.mealDonaltionList = [];
		ft.mealFundingList = [];
		
		$scope.$on("data-loaded-ngo", function(obj) {
			ft.load();
		});
		
		ft.load = function() {
		if (ngoEnrollmentService.fundingData) {
			ft.fundingSourceList = ngoEnrollmentService.fundingData["fundingSource"];
			ft.mealDonaltionList = ngoEnrollmentService.fundingData["mealDonation"];
			ft.mealFundingList = ngoEnrollmentService.fundingData["mealFunding"];
			
			if(ft.fundingSourceList.length != 0){
				$scope.show = true;
			}
		}
		}
		ft.save = function() {
			var data = {
				"fundingSource" : ft.fundingSourceList,
				"mealDonation" : ft.mealDonaltionList,
				"mealFunding" : ft.mealFundingList
			};

			if (ft.mealDonaltionList.length != 0) {
				ngoEnrollmentService.setFundingData(data);
				var serviceCalls = ngoEnrollmentService.savePartial();
				$q.all(serviceCalls)// .then(onSuccess,onError);
				$rootScope.$broadcast("scroll-tab", [ 1, 2 ]);
			} else {
				alert("Meal Donation fields are mandatory to save");
			}
		}
	}
})();
