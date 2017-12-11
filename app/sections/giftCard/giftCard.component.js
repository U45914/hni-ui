(function(){
	angular.module('app').component('giftCard',{
		bindings : {

		},
		templateUrl : 'giftCard.tpl.html',
		controller : giftCardController,
		controllerAs : 'vm'
	});
	
	giftCardController.$inject = ['$scope', '$http', 'giftCardService', '$window', 'serviceConstants' , 'gridService', 'toastService', '$mdDialog', 'validateService', 'validateFormData'];
	
	function giftCardController($scope, $http, giftCardService, $window,  serviceConstants, gridService, toastService, $mdDialog, validateService, validateFormData){
		
		$window.scrollTo(0, 0);
		
		var vm = this;
		var providerDetailsPath = "provider/all";
		vm.isProviderSelected = false;
		vm.clearDirtyRows = [];
		vm.states = validateService.validateStateDrpdwn();
		
		vm.goBack = function(){
			$window.history.back();
		}
		
		vm.loadProviders = function(){
			gridService.getGridDataFor(providerDetailsPath).then(function(response){
				vm.providers = response.data.data;
			});
		}
		vm.loadProviders();
		
		vm.gridOptions = {
                urlSync: false,
                appScopeProvider: this,
                columnDefs:[],
                data : [],
                enableFiltering: true,
                multiSelect: true,
                enableSelectAll: true,
                paginationPageSizes: [25, 50, 100],
                paginationPageSize: 50
       }
		
		vm.showGiftCards = function(){
			vm.isProviderSelected = true;
			vm.getGiftCards();
		}
		
		vm.getGiftCards = function(){
			giftCardService.getProviderGiftCards(vm.provider).then(function(response){
				vm.gridOptions.columnDefs = response.data.headers;
				if(response.data.data != null){
					vm.gridOptions.data = response.data.data;
					vm.appendOptionsToColumns();
				} else {
					vm.gridOptions.data = [];
				}
			});
		}
		
		vm.appendOptionsToColumns = function() {
			var deactivateIcon = {
				field : "name",
				displayName : "",
				editable : false,
				enableFiltering: false,
				enableSorting: false,
				pinnedRight : true,
				cellTemplate : '<md-button ng-click="grid.appScope.deactivateGiftCard($event, row)" class="md-raised button-primary md-button md-ink-ripple" ng-if="grid.appScope.isButtonActive(ev, row)">DE-ACTIVATE</md-button><md-button ng-click="grid.appScope.activateGiftCard($event, row)" class="md-raised button-primary md-button md-ink-ripple" ng-if="!grid.appScope.isButtonActive(ev, row)">ACTIVATE</md-button>',
				height : 80
			}
			
			var stateIcon = {
					field: "stateCode",
        			displayName: "State",
        			pinnedRight:true,
        			editableCellTemplate: 'ui-grid/dropdownEditor',
        			editDropdownOptionsArray: vm.states,
        			editDropdownIdLabel: 'value',
        			editDropdownValueLabel: 'name',
        			cellTemplate: '<div class="ui-grid-cell-contents" ng-bind="grid.appScope.getName($event, row)"></div>',
        			height: 80,
        			width : 100
        			
			}
			var rechargeIcon = {
					field : "name",
					displayName : "Recharge",
					editable : false,
					enableFiltering: false,
					enableSorting: false,
					pinnedRight : true,
					cellTemplate : '<md-button ng-click="grid.appScope.rechargeGiftCard($event, row)" class="md-raised button-primary md-button md-ink-ripple">RECHARGE</md-button>',
					height : 80
				}
				
			vm.gridOptions.columnDefs.push(stateIcon);
			vm.gridOptions.columnDefs.push(rechargeIcon);
			vm.gridOptions.columnDefs.push(deactivateIcon);
		}
		
		
		vm.rechargeGiftCard = function(ev, row){
			$mdDialog.show({
				controller : 'rechargeGiftCardController',
				controllerAs : 'rcc',
				templateUrl : 'rechargeGiftCard.tpl.html',
				parent : angular.element(document.body),
				targetEvent : ev,
				clickOutsideToClose : true,
				escapeToClose : true,
				fullscreen : $scope.customFullscreen,
				locals : {
					giftCard : row.entity.id
				}
			}).then(function(answer) {
				console.log(answer);
				vm.getGiftCards();
			});
		}
		
		vm.getName = function(ev, row){
			for(var index=0; index<vm.states.length; index++){
				if(row.entity.stateCode == null || vm.states[index]==null ){
					return "";
				}
				if(row.entity.stateCode == vm.states[index].value){
					return vm.states[index].name;	
				}
			}
		}
		
		vm.isButtonActive = function(ev, row){
			if(row.entity.status == "Active"){
				return true;
			}
		}
		
		vm.deactivateGiftCard = function(ev, row){
			giftCardService.deactivateGiftCard(row.entity.id).then(function(response){
				toastService.showToast(response.data.message);
				vm.getGiftCards();
			});
		}
		
		vm.activateGiftCard = function(ev, row){
			giftCardService.activateGiftCard(row.entity.id).then(function(response){
				toastService.showToast(response.data.message);
				vm.getGiftCards();
			});
		}
		
		vm.gridOptions.onRegisterApi = function(gridApi){
	       	 vm.gridApi = gridApi;
	       	 gridApi.selection.on.rowSelectionChanged($scope,function(row){
	                	vm.selectedRows = gridApi.selection.getSelectedRows();
	                	if(vm.selectedRows.length>0){
	                		vm.deleteButton = false;
	                	} else {
	                		vm.deleteButton = true;
	                	}
	            });
	       	 gridApi.selection.on.rowSelectionChangedBatch($scope,function(row){
	       		 angular.forEach(rows, function(row){
	        			
	        			if (row.isSelected) {
	        				vm.selectedRows.push(row);
	        			} else {
	        				vm.selectedRows = [];
	        			}
	        		});
	       	 });
			}
		
		vm.clear = function(){
			vm.cardNumber = "";
			vm.serialNumber = "";
			vm.pinNumber = "";
			vm.amount = "";
			vm.state = "";
			vm.isChecked = false;
		}
		
		vm.saveNewCard = function(){
			if(vm.isChecked){
				vm.serialNumber = "";
			}
			var payload = {
					"cardNumber" : vm.cardNumber,
					"cardSerialId" : vm.serialNumber,
					"pinNumber" : vm.pinNumber,
					"originalBalance" : vm.amount,
					"stateCode" : vm.state,
					"provider" : {
						"id" : vm.provider
					}
			};
			
			if(validateFormData.saveGiftCardForm(payload, vm.isChecked)){
				giftCardService.saveNewGiftCard(payload).then(function(response){
					toastService.showToast(response.data.data);
					vm.getGiftCards();
					if(response.data.message == "success"){
						vm.clear();
					}
				});
			} else {
				toastService.showToast("Please fill the required fields.");
			}
		}
		
		vm.updateGiftCards = function(){
			var updatedRows = vm.gridApi.rowEdit.getDirtyRows();
			var newRows = [];
			for(var index=0; index < updatedRows.length; index++){
				newRows.push(updatedRows[index].entity);
			}
			if(newRows.length>0){
				giftCardService.updateGiftCards(newRows).then(function(response){
					toastService.showToast(response.data.data);
					vm.gridApi.grid.rowEdit.dirtyRows = vm.clearDirtyRows;
					vm.getGiftCards();
					$window.scrollTo(0, 0);
				});
			}
		}
	}
})();