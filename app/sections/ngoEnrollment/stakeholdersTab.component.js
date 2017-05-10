(function() {
	angular.module('app').directive('stakeholdersTab', stakeholderDirective)

	function stakeholderDirective() {
		return {
			scope : {

			},
			restrict : "E",
			templateUrl : "stakeholdersTab.tpl.html",
			controller : StakeHolderTabController,
			controllerAs : 'shtc'
		}
	}

	StakeHolderTabController.$inject = [ '$q', 'ngoEnrollmentService',
			'$scope', '$rootScope' ];

	function StakeHolderTabController($q, ngoEnrollmentService, $scope,
			$rootScope) {
		
		
		var shtc = this;
		shtc.boardMainList = [];
		shtc.brandPartnersList = [];
		shtc.localPartnersList = [];
		
		$scope.$on("data-loaded-ngo", function(obj) {
			shtc.load();
		});
		
		shtc.save = function(isTopTabClicked) { 			
			var data = {
				"boardMembers" : shtc.boardMainList,
				"brandPartners" : shtc.brandPartnersList,
				"localPartners" : shtc.localPartnersList
			};
			ngoEnrollmentService.setStakeHolderData(data);
			var serviceCalls = ngoEnrollmentService.savePartial();
			$q.all(serviceCalls)// .then(onSuccess,onError);
			if(!isTopTabClicked){
				$rootScope.$broadcast("scroll-tab", [ 1, 2 ]);
			}
		}
		shtc.load = function() {
			if (ngoEnrollmentService.stakeHolderData) {
				ngoEnrollmentService.setStakeHolderData(ngoEnrollmentService.stakeHolderData);
				shtc.boardMainList = ngoEnrollmentService.stakeHolderData["boardMembers"];
				shtc.brandPartnersList = ngoEnrollmentService.stakeHolderData["brandPartners"];
				shtc.localPartnersList = ngoEnrollmentService.stakeHolderData["localPartners"];
			}
		}
		
		$rootScope.$on("tabFocusChangedFromTabTwo", function(event, data){
			shtc.load();
			shtc.save(true);
		})
		
	}

})();