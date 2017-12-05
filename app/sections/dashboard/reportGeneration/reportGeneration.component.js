(function(){
	angular.module('app')
	
	.directive('reportGeneration', reportGenerationDirective)
	
	function reportGenerationDirective() {
		return {
			restrict : "E",
			scope : {
				ds: "=ds",
			    serviceds : "=",
			    headerds : "=",
			    indexFirst: "=indexFirst"
			    
			},
			templateUrl : "report-generation.tpl.html",
			controller : reportGenerationController,
			controllerAs : "vm"
		}
		
	}
	
	reportGenerationController.$inject= ['$rootScope', '$scope','$http','serviceConstants','$state', 'gridService', 'toastService', '$window', '$timeout', '$mdDialog'];
	
	function reportGenerationController($rootScope, $scope, $http, serviceConstants,$state,gridService, toastService, $window, $timeout, $mdDialog) {
		let baseUrl = serviceConstants.baseUrl;
        var vm = this;
        vm.selectedRow = null;
        vm.disableViewProfile = true;
        vm.disableDelete = true;
        vm.disableActivate = true;
        vm.disableSheltered = true;
        vm.sendMsg = true;
        vm.report = $scope.ds;
        vm.showNothing=false;
        vm.showReport = {};
        vm.showData=true;
        vm.selectedRows = 0;
        vm.isParticipant = false;
        vm.isProvider = false;
        vm.isNgo = false;
        vm.isVolunteer = false;
        vm.reportType = getReportKey(vm.report.label);
        if(vm.reportType == "participant"){
        	vm.isParticipant = true;
        }
        else{
        	vm.isParticipant = false;
        }
        
        if(vm.reportType == "provider"){
        	vm.isProvider = true;
        }
        else{
        	vm.isProvider = false;
        }
        if(vm.reportType == "ngo"){
        	vm.isNgo = true;
        }
        else{
        	vm.isNgo = false;
        }
        if(vm.reportType == "volunteer"){
        	vm.isVolunteer = true;
        }
        else{
        	vm.isVolunteer = false;
        }
        vm.viewModel = $window.localStorage['selectedActionCard'];
        if (vm.viewModel) {
        	vm.showReport[vm.viewModel] = true;
        } else {
        	if ($scope.indexFirst == 0) {
            	vm.showReport[vm.reportType] = true;
            } else {
            	vm.showReport[vm.reportType] = false;
            }
        }

        vm.gridOptions = {
        		 data: [],
                 urlSync: false,
                 columnDefs:[],
                 enableFiltering: true,
                 multiSelect: true,
                 enableSelectAll: true,
                 enableColumnResizing: true,
                 paginationPageSizes: [25, 50, 100],
                 paginationPageSize: 50,
                 appScopeProvider: this,
        }

        vm.gridOptions.onRegisterApi = function(gridApi){
            // set gridApi on scope
        	 vm.gridApi = gridApi;
        	// For Select All
        	gridApi.selection.on.rowSelectionChangedBatch($scope,function(rows){
        		angular.forEach(rows, function(row){
        			
        			if (row.isSelected) {
        				vm.selectedRows.push(row);
        			} else {
        				vm.selectedRows = [];
        			}
        		});
        	});
        	
            gridApi.selection.on.rowSelectionChanged($scope,function(row){
	            vm.selectedRows = gridApi.selection.getSelectedRows();
	            if(vm.selectedRows.length >= 1){
	            	
	            	vm.disableDelete = false;
		            vm.disableActivate = false;
		            vm.disableSheltered = false;
		            vm.sendMsg = false;
		            
		            if(vm.selectedRows[0].active == "Active"){
		            	vm.isActivated = true;
		            }else{
		            	vm.isActivated = false;
		            }
		            if(vm.selectedRows[0].sheltered == "Yes"){
		            	vm.isSheltered = true;
		            } else {
		            	vm.isSheltered = false;
		            }
		            
	            	vm.disableViewProfile = false;
	            	if(vm.selectedRows.length > 1) {
	            		vm.disableViewProfile = true;
	            	}
	            } else{
	            	  vm.disableViewProfile = true;
	            	  vm.disableDelete = true;
	  	              vm.disableActivate = true;
	  	              vm.disableSheltered = true;
	  	              vm.sendMsg = true;
	            }
            });
        }
        
        vm.viewProfile = function(event, row) {
        	if(vm.reportType == "participant"){
	        	$state.go('profile-detail',{
	        		'data' : {
	        			userId : row.entity.userId
	        		}
	        	});
        	}else if(vm.reportType == "provider"){
        		$state.go('provider-detail',{
            		'data' : {
            			providerId : row.entity.providerId
            		}
            	});
        	}
        }
        vm.loadGrid = function() {
        	gridService.getGridDataFor(vm.report.reportPath).then(function success(response) {
                if(response.data !== null) {
                    vm.service = response.data.data;
                    vm.gridOptions.data = response.data.data;
                    vm.gridOptions.columnDefs = response.data.headers;
                    if ((vm.isParticipant || vm.isProvider) && vm.gridOptions.columnDefs.length != 0) {
                    	var editButton = {
                    			field: "name",
                    			displayName: "",
                    			editable:false,
                    			pinnedRight:true,
                    			cellTemplate: '<md-button ng-click="grid.appScope.viewProfile($event, row)" class="md-raised button-primary md-button md-ink-ripple">View Profile</md-button>',
                    			height: 100,
                    			width:100,
                    			enableFiltering: false,
                    	}
                    	vm.gridOptions.columnDefs.push(editButton);
                    }
                    if(vm.service.length==0) {
 	                	   vm.showNothing=true;
 	                	   vm.showData=false;
                 	}
                    vm.headers= response.data.headers;
                 }
             }, function error(error) {
                 console.log(error);
             });
        }
        
        vm.addressContents = function(grid, row){
        	return row.entity.address;
        }
        
        vm.resetGridData = function() {
        	vm.disableDelete = true;
            vm.disableActivate = true;
            vm.disableSheltered = true;
            vm.disableViewProfile = true;
            vm.sendMsg = true;
        	gridService.getGridDataFor(vm.report.reportPath).then(function(response) {
        		if(response.data !== null) {
        			vm.gridOptions.data = response.data.data;
                    vm.gridOptions.columnDefs = response.data.headers;
                    if ((vm.isParticipant || vm.isProvider) && vm.gridOptions.columnDefs.length != 0) {
                    	var editButton = {
                    			field: "name",
                    			displayName: "",
                    			editable:false,
                    			pinnedRight:true,
                    			cellTemplate: '<md-button ng-click="grid.appScope.viewProfile($event, row)" class="md-raised button-primary md-button md-ink-ripple">View Profile</md-button>',
                    			height: 100,
                    			width:100,
                    			enableFiltering: false,
                    	}
                    	vm.gridOptions.columnDefs.push(editButton);
                    }
                    if (vm.gridApi != null) {
                    	vm.gridApi.core.refresh();
                    }
        		}
        	});
        }
        
        vm.deleteSelected = function(){
        	
        	if(vm.reportType != "provider") {
        		if(vm.selectedRows.length > 0 && !vm.disableDelete){
            		$window.scrollTo(0, 0);
    	        	if(vm.selectedRows.length == 1)
    	        		gridService.deletion(vm.selectedRows[0].userId).then(function(response){
    	        			toastService.showToast(response.data.message);
    	        		});
    	        	else{
    	        		var deleteUsers = [];
    	        		for(var index=0 ; index < vm.selectedRows.length; index++){
    	        			deleteUsers.push(vm.selectedRows[index].userId);
    	        		}
    	        		gridService.deletion(deleteUsers).then(function(response){
    	        			toastService.showToast("Your request has been submitted.");
    	        		});
    	        	}
            	}
        	} else if(vm.reportType == "provider"){
        		if(vm.selectedRows.length > 0 && !vm.disableDelete){
        			$window.scrollTo(0, 0);
    	        	var deleteUsers = [];
    	        	for(var index=0 ; index < vm.selectedRows.length; index++){
    	        		deleteUsers.push(vm.selectedRows[index].providerId);
    	        	}
    	        	gridService.deleteProvider(deleteUsers).then(function(response){
    	        		toastService.showToast(response.data.message);
    	        	});
            	}
        	}
        	vm.resetGridData();
        }
        
        vm.activated = function(){
        	var activateUsers = [];
        	if(vm.selectedRows.length > 1 && !vm.disableActivate){
        		for(var index = 0; index < vm.selectedRows.length; index++ ){
        			activateUsers.push(vm.selectedRows[index].userId);
        		}
        		gridService.activation(activateUsers, vm.isActivated). then(function(response){
        			$window.scrollTo(0, 0);
        			toastService.showToast("Your request has been submitted.");
        			vm.resetGridData();
        		});
        	}else if(vm.selectedRows.length == 1){
        		gridService.activateUser(vm.selectedRows[0].userId, vm.isActivated). then(function(response){
        			$window.scrollTo(0, 0);
        			toastService.showToast(response.data.message);
        			vm.resetGridData();
        		});
        	}
        	
        }
        
        vm.sheltered = function(){
        	
        	var shelteredUsers = [];
        	if(vm.selectedRows.length > 1 && !vm.disableSheltered){
        		for(var index = 0; index < vm.selectedRows.length; index++ ){
        			shelteredUsers.push(vm.selectedRows[index].userId);
        		}
        		gridService.sheltered(shelteredUsers, vm.isSheltered). then(function(response){
        			$window.scrollTo(0, 0);
        			toastService.showToast("Your request has been submitted.");
        			vm.resetGridData();
        		});
        	}else if(vm.selectedRows.length == 1){
        		shelteredUsers.push(vm.selectedRows[0].userId);
        		gridService.sheltered(shelteredUsers, vm.isSheltered). then(function(response){
        			$window.scrollTo(0, 0);
        			toastService.showToast("Your request has been submitted.");
        			vm.resetGridData();
        		});
        	}
        	
        }        
        vm.loadGrid();
        
        function getReportKey(reportKey) {
        	var key;
        	if (reportKey.toLocaleLowerCase().indexOf("ngo") != -1) {
        		key = "ngo";
        	} else if (reportKey.toLocaleLowerCase().indexOf("volunteer") != -1) {
        		key = "volunteer";
        	} else if (reportKey.toLocaleLowerCase().indexOf("participant") != -1) {
        		key = "participant";
        	} else if (reportKey.toLocaleLowerCase().indexOf("provider") != -1) {
        		key = "provider";
        	}else if (reportKey.toLocaleLowerCase().indexOf("orders") != -1) {
        		key = "orders";
        	}
        	
        	return key;
        }
        
        $rootScope.$on("show-report-view", function(event, type) {
        	vm.showReport[type] = true;
        	vm.disableViewProfile = true;
        	angular.forEach(vm.showReport, function (value, key){
        		if (type !== key) {
        			vm.showReport[key] = false;
        		}
        	});
        	
        	vm.showReport[type] = true;
        });
     
        vm.sendMessage = function(){
        	var userId = [];
        	for(var i=0; i<vm.selectedRows.length; i++){
        		userId.push(vm.selectedRows[i].userId);
        	}
        	if(userId.length>0){
	        	$mdDialog.show({
					controller : 'sendMessageController',
					controllerAs : 'sm',
					templateUrl : 'sendMessage.tpl.html',
					parent : angular.element(document.body),
					//targetEvent : ev,
					clickOutsideToClose : true,
					escapeToClose : true,
					fullscreen : $scope.customFullscreen,
					locals : {
						dataList : userId
					}
				}).then(function(answer) {
					console.log(answer);
				});
        	}
        	
        }
}
	
})();

