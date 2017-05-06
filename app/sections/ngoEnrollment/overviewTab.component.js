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
				vm.view.promoters = " ";
			}
		}
		vm.delRow = function(index) {
			vm.list.splice(index, 1);
		}
		 vm.validationCheck = function (type, id, value, event){
				if(value!=null){
					vm.fields[id] = false;
					if(type=="number"){
						if(id=="zip"){
								var zip=vm.view.address.zip;
								if (isNaN(Number(zip))|| (zip.length != 6) || zip.indexOf("-")!=-1) {
									vm.fields[id] = true;
									vm.msgs[id]="Invalid Zip";
									validateFail = true;
								}else{
									vm.fields[id]=false;
									validateFail = false;
								}
						}
						if(id=="fte"){
							var fte = vm.view.employees;
							if (isNaN(Number(fte)) ||  fte < 0) {
								vm.fields[id] = true;
								vm.msgs[id]="Invalid Employee";
								validateFail = true;
							}else{
								vm.fields[id]=false;
								validateFail = false;
							}
					}
					}
				}
				else{
					

					validateFail = true;
					if(id=="email"||id=="website"){
						if (event.target.value != "" && value == null) {
							vm.fields[id] = true;
							vm.msgs[id]="Invalid Format";
						} else {
							vm.fields[id] = true;
							vm.msgs[id]="Please fill this field";
						}
					}
					else{
						vm.fields[id] = true;
						vm.msgs[id]="Please fill this field";
					}
											
				}
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
				//window.alert("Please fill the fields");
				//return false;
			}
		}
		vm.load = function() {
			vm.view = ngoEnrollmentService.overviewData;
			if (vm.view && vm.view.promoters) {
				vm.list = vm.view.promoters;
				vm.view.promoters = " ";
			}
			if (vm.list) {
				vm.flag = true;
			}
		}

		function onSuccess(response) {

		}

		function onError(response) {
			console.log(response)
		}
		
		vm.checkPhoneNbr = function() {
			var phone = vm.view.phone;
			
			
			var patt = new RegExp("(?=.*[0-9])(?=.*[-]).{12}");
			
			var res = patt.test(phone);
			if (res == true) {
				vm.check=false;
			} else {
				vm.check=true;
			}
		};
		

		vm.validate = function(type, id, value, event){
			var data = validateFormData.validate(type, id, value, event);
			vm.fields[id] = data.field[id];
			vm.msgs[id] = data.msg[id];
		};
		
	}
})();
