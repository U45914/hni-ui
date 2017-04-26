(function() {
	angular.module('app')

	.directive('overviewTab', overviewDirective)

	function overviewDirective() {
		return {
			scope : {

			},
			restrict : "E",
			templateUrl : "overviewTab.tpl.html",
			controller : overviewController,
			controllerAs : 'vm'
		}

	}

	overviewController.$inject = [ '$q', 'ngoEnrollmentService', '$rootScope', '$scope' ];

	function overviewController($q, ngoEnrollmentService, $rootScope, $scope) {
		var vm = this;
		vm.list = [];

		$scope.$on("data-loaded-ngo", function(obj) {
			vm.load();
		});
		vm.addRow = function(promoters) {
			if (promoters != null) {
				vm.list.push(promoters);
				vm.flag = true;
				vm.view.promoters = " ";
			}
		}
		vm.delRow = function(index) {
			vm.list.splice(index, 1);
		}
		

		vm.view = ngoEnrollmentService.overviewData;
		console.log("v.view : ");
		console.log(vm.view);
		if (vm.view && vm.view.promoters) {
			vm.list = vm.view.promoters;
			vm.view.promoters = " ";
		}
		if (vm.list) {
			vm.flag = true;
		}
		vm.save = function() {
			var data = {
				"name" : vm.view.name,
				"phone" : vm.view.phone,
				"website" : vm.view.website,
				"contact" : vm.view.contact,
				"employees" : vm.view.employees,
				"overview" : vm.view.overview,
				"mission" : vm.view.mission,
				"promoters" : vm.list
			};

			if (vm.view.name != null && vm.view.phone != null
					&& vm.view.website != null && vm.view.contact != null
					&& vm.view.employees != null && vm.view.overview != null
					&& vm.view.mission != null) {
				ngoEnrollmentService.setOverviewData(data);
				var serviceCalls = ngoEnrollmentService.savePartial();
				/*
				 * .then(function successCallback(response) { if (response &&
				 * response.data.response && response.data.response ==
				 * "success") { alert("saved");
				 * $rootScope.$broadcast("scroll-tab", [1,2]); } else {
				 * alert("Failed : "+ response.data.errorMsg)
				 * //toaster.success("Failed : "+ response.data.errorMsg); } },
				 * function errorCallback(response) {
				 * 
				 * alert("Something went wrong, please try again"); }); return
				 * $q.all(serviceCalls)//.then(onSuccess,onError);
				 */
				$rootScope.$broadcast("scroll-tab", [ 1, 2 ]);
			} else {
				// toaster.success('Hello world!', 'Toastr fun!');
				window.alert("Please fill the fields");
				return false;
			}
		}
		vm.load = function() {
			vm.view = ngoEnrollmentService.overviewData;
		}

		function onSuccess(response) {

		}

		function onError(response) {
			console.log(response)
		}

	}
})();
