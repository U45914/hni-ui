(function(){
	angular
	.module('app')
	.component('profileDetail', {
		bindings: {},
		templateUrl : 'profile-detail.tpl.html',
		controller : reportDetailController,
		controllerAs : 'vm'
	});

	reportDetailController.$inject= ['$rootScope', '$scope','$http','serviceConstants','toastService','$state','gridService','$window'];
		
	function reportDetailController($rootScope, $scope, $http, serviceConstants, toastService,$state,gridService,$window) {
		$window.scrollTo(0, 0);
		let baseUrl = serviceConstants.baseUrl;
			var vm = this;
			var dependents = {};
			var userId = $state.params.data.userId;
			vm.dependentList = [];
			vm.shelteredText = "Unsheltered";
			vm.activeText = "Not active";
			vm.isSheltered = false;
			$http.post(`${baseUrl}/configure/user/participant/details`, userId).then(function(response){
				vm.dataFromServer = response.data;
				vm.firstName = vm.dataFromServer.user.firstName;
				vm.lastName = vm.dataFromServer.user.lastName;
				vm.mobilePhone = vm.dataFromServer.user.mobilePhone;
				vm.maxOrderAllowed = vm.dataFromServer.maxOrderAllowed;
				vm.maxMealsAllowedPerDay = vm.dataFromServer.maxMealsAllowedPerDay;
				if(vm.dataFromServer.dependents.length > 0){
					vm.dependentList = vm.dataFromServer.dependents;
				}
				if(vm.dataFromServer.sheltered == true){
					vm.shelteredText = "Sheltered";
					vm.isSheltered = true;
				}
				if(vm.dataFromServer.user.isActive == true){
					vm.activeText = "Active";
					vm.isActivated = true;
				}
				$http.get(`${baseUrl}/reports/view/ngo/all`)
				  .then(function(response){
					  vm.ngos = response.data.data;
					  for(var index=0; index<response.data.data.length; index++){
						  if(vm.dataFromServer.ngo.userId == response.data.data[index].userId){
							  vm.ngo = response.data.data[index].name;
							  vm.ngoId = response.data.data[index].id;
						  }
					  }
				  });
			});
			//var user = $state.params.data.users[0];
			$scope.$watch('vm.mobilePhone',function(newValue, oldValue){
				if(vm.mobilePhone.length == 3 || vm.mobilePhone.length == 7){
					vm.mobilePhone += '-';
				}
			});
			vm.save = function(){
				var data = {
					"id"  : vm.dataFromServer.id,
					"user" : {
						"id" : userId,
						"firstName" : vm.firstName,
						"lastName" : vm.lastName,
						"mobilePhone" : vm.mobilePhone,
						"isActive" : vm.isActivated
					},
					"dependents": vm.dependentList,
					"ngo" : {
						id : vm.ngoId,
					},
					"maxOrderAllowed" : vm.maxOrderAllowed,
					"maxMealsAllowedPerDay" : vm.maxMealsAllowedPerDay
				};
				gridService.saveParticipant(data).then(function(response){
        			toastService.showToast(response.data.message);
				});
			}
			
			vm.goBack = function(){
				$window.history.back();
			}
			vm.addNewRow = function() {
				if(vm.name!=null &&  vm.age != null){
				dependents.name = vm.name;
				dependents.age = vm.age;
				//dependents.gender = vm.gender;
				vm.dependentList.push(dependents);
				dependents = {};
				vm.name= "";
				vm.age="";
				vm.gender="";
				}
				else{
					toastService.showToast("Please enter valid values in the fields");
				}
			}
			
			vm.deleteBrand = function(idx) {
				vm.dependentList.splice(idx,1);
			}
			
			vm.deleteUser = function(){
				gridService.deletion(userId).then(function(response){
        			toastService.showToast(response.data.message);
        			$state.go("dashboard");
        		});	
			}
			
			vm.activateUser = function(){
				if(vm.isActivated){
					vm.activeText = "Not Active";
				}else{
					vm.activeText = "Active";
				}
				gridService.activateUser(userId, vm.isActivated). then(function(response){
        			$window.scrollTo(0, 0);
        			toastService.showToast(response.data.message);
        		});
			}
			
			vm.shelterUser = function(){
				if(vm.isSheltered){
					vm.shelteredText = "Unsheltered";
				}else{
					vm.shelteredText = "Sheltered";
				}
				var shelteredUsers = [];
				shelteredUsers.push(userId);
				gridService.sheltered(shelteredUsers, vm.isSheltered). then(function(response){
        			$window.scrollTo(0, 0);
        			toastService.showToast("Your request has been submitted.");
        		});
			}
		};
})();