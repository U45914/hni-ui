(function(){
	angular.module('app').component('giftCard',{
		bindings : {

		},
		templateUrl : 'giftCard.tpl.html',
		controller : giftCardController,
		controllerAs : 'vm'
	});
	
	giftCardController.$inject = ['$scope', '$http', 'giftCardService', '$window', 'serviceConstants' , 'gridService', 'toastService', '$mdDialog'];
	
	function giftCardController($scope, $http, giftCardService, $window,  serviceConstants, gridService, toastService, $mdDialog){
		
		$window.scrollTo(0, 0);
		
		var vm = this;
		var providerDetailsPath = "provider/all";
		vm.isProviderSelected = false;
		vm.clearDirtyRows = [];
		
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
				vm.gridOptions.data = response.data.data;
				vm.appendDeleteOptionToColumns();
			});
		}
		
		vm.appendDeleteOptionToColumns = function() {
			var removeIcon = {
				field : "name",
				displayName : "",
				editable : false,
				pinnedRight : true,
				cellTemplate : '<md-button ng-click="grid.appScope.deleteGiftCard($event, row)" class="md-raised button-primary md-button md-ink-ripple">Remove</md-button>',
				height : 80
			}
			vm.gridOptions.columnDefs.push(removeIcon);
		}
		
		vm.deleteGiftCard = function(ev, row){
			giftCardService.deleteGiftCard(row.entity.id).then(function(response){
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
			vm.isChecked = false;
		}
		
		vm.saveNewCard = function(){
			if(vm.isChecked){
				vm.serialNumber = "";
			}
			var payload = {
					"cardNumber" : vm.cardNumber,
					"serialNumber" : vm.serialNumber,
					"pin" : vm.pin
			};
			giftCardService.saveNewGiftCard(payload).then(function(response){
				toastService.showToast(response.data.message);
			});
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
					$window.scrollTo(0, 0);
				});
			}
		}
	}
})();