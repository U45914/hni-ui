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

	overviewController.$inject = [ '$q', 'ngoEnrollmentService', '$rootScope', '$scope', 'validateService', 'validateFormData'];

	function overviewController($q, ngoEnrollmentService, $rootScope, $scope, validateService, validateFormData) {
		var vm = this;
		vm.list = [];
		vm.fields = {};
		vm.msgs = {};
		var validateFail = false;
		
		vm.states = validateService.validateStateDrpdwn();
		
		$scope.$on("data-loaded-ngo", function(obj) {
			vm.load();
		});
		vm.addRow = function(promoters) {
			if (promoters != null) {
				vm.list.push(promoters);
				vm.flag = true;
				vm.view.promoters = "";
			}
		}
		vm.delRow = function(index) {
			vm.list.splice(index, 1); 
		}
	
		vm.save = function(isTopTabClicked) {
			if(vm.view){
			var data = {
				"name" : vm.view.name,
				"mobilePhone" : vm.view.mobilePhone,
				"website" : vm.view.website,
				"contactPerson" : vm.view.contactPerson,
				"employees" : vm.view.employees,
				"overview" : vm.view.overview,
				"mission" : vm.view.mission,
				"promoters" : vm.list,
				"address" : {
					"name" : "office",
					"address1" : vm.view.address.address1,
					"address2" : vm.view.address.address2,
					"city" : vm.view.address.city,
					"state" : vm.view.address.state,
					"zip" : vm.view.address.zip,
				},
			};
		
				ngoEnrollmentService.setOverviewData(data);
				var serviceCalls = ngoEnrollmentService.savePartial();
				if(!isTopTabClicked){
					$rootScope.$broadcast("scroll-tab", [ 1, 2 ]);
				}
			}	
		}
			
		
		vm.load = function() {
			vm.view = ngoEnrollmentService.overviewData;
			ngoEnrollmentService.setOverviewData(vm.view);
			if (vm.view && vm.view.promoters) {
				vm.list = vm.view.promoters;
				vm.view.promoters = "";
			}
			if (vm.list) {
				vm.flag = true;
			}
		}

	/*	function onSuccess(response) {

		}

		function onError(response) {
			console.log(response)
		}*/
		
		vm.validate = function(type, id, value, event){
			var data = validateFormData.validate(type, id, value, event);
			vm.fields[id] = data.field[id];
			vm.msgs[id] = data.msg[id];
		};
		 
		$rootScope.$on("tabFocusChangedFromTabOne", function(event, data){			
			vm.save(true);
		})
		
	}
})();
