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
	
	reportGenerationController.$inject= ['$rootScope', '$scope','$http','serviceConstants','$state', 'gridService', 'toastService', '$window', '$timeout'];
	
	function reportGenerationController($rootScope, $scope, $http, serviceConstants,$state,gridService, toastService, $window, $timeout) {
		let baseUrl = serviceConstants.baseUrl;
        var vm = this;
        vm.selectedRow = null;
        vm.disableViewProfile = true;
        vm.disableDelete = true;
        vm.disableActivate = true;
        vm.disableSheltered = true;
        vm.report = $scope.ds;
        vm.showNothing=false;
        vm.showReport = {};
        vm.showData=true;
        vm.selectedRows = 0;
        vm.isParticipant = false;
        vm.reportType = getReportKey(vm.report.label);
        if(vm.reportType == "participant"){
        	vm.isParticipant = true;
        }
        else{
        	vm.isParticipant = false;
        }
        if ($scope.indexFirst == 0) {
        	vm.showReport[vm.reportType] = true;
        } else {
        	vm.showReport[vm.reportType] = false;
        }
        vm.gridOptions = {
        		 data: [],
                 urlSync: false,
                 columnDefs:[],
                 enableFiltering: true,
                 multiSelect: true,
                 paginationPageSizes: [50, 100, 150, 200],
                 paginationPageSize: 50,
        }
        
        vm.viewProfile = function(){
        	$state.go('report-detail',{
        		'data' : {
        			userId : vm.selectedRow
        		}
        	});
        }
        vm.gridOptions.onRegisterApi = function(gridApi){
            //set gridApi on scope
           // $scope.gridApi = gridApi;
        	
            gridApi.selection.on.rowSelectionChanged($scope,function(row){
            vm.selectedRows = gridApi.selection.getSelectedRows();
            if(vm.selectedRows.length >= 1){
            	
            	vm.disableDelete = false;
	            vm.disableActivate = false;
	            vm.disableSheltered = false;
	            if(vm.selectedRows[0].active == "Active"){
	            	vm.isActivated = true;
	            }else{
	            	vm.isActivated = false;
	            }
	            
	            if(vm.selectedRows[0].sheltered == "Sheltered"){
	            	vm.isSheltered = true;
	            }else{
	            	vm.isSheltered = false;
	            }
            	
            	vm.disableViewProfile = false;
            	if(vm.selectedRows.length > 1)
            		vm.disableViewProfile = true;
            }
              else{
            	  vm.disableViewProfile = true;
            	  vm.disableDelete = true;
  	              vm.disableActivate = true;
  	              vm.disableSheltered = true;
            }
            });
        }
        
        vm.deleteSelected = function(){
        	if(vm.selectedRows.length > 0 && !vm.disableDelete){
        		$window.scrollTo(0, 0);
	        	if(vm.selectedRows.length == 1)
	        		gridService.deletion(vm.selectedRows[0].uid).then(function(response){
	        			toastService.showToast(response.data.message);
	        		});
	        	else{
	        		var deleteUsers = [];
	        		for(var index=0 ; index < vm.selectedRows.length; index++){
	        			deleteUsers.push(vm.selectedRows[index].uid);
	        		}
	        		gridService.deletion(deleteUsers).then(function(response){
	        			toastService.showToast("Your request has been submitted.");
	        		});
	        	}
        	}
        	$timeout(() => {
        		$window.location.reload();
            }, 3000);
        	
        }
        
        vm.activated = function(){
        	var activateUsers = [];
        	if(vm.selectedRows.length > 1 && !vm.disableActivate){
        		for(var index = 0; index < vm.selectedRows.length; index++ ){
        			activateUsers.push(vm.selectedRows[index].uid);
        		}
        		gridService.activation(activateUsers, vm.isActivated). then(function(response){
        			$window.scrollTo(0, 0);
        			toastService.showToast("Your request has been submitted.");
        			$timeout(() => {
                		$window.location.reload();
                    }, 3000);
        		});
        	}else if(vm.selectedRows.length == 1){
        		gridService.activateUser(vm.selectedRows[0].uid, vm.isActivated). then(function(response){
        			$window.scrollTo(0, 0);
        			toastService.showToast(response.data.message);
        			$timeout(() => {
                		$window.location.reload();
                    }, 3000);
        		});
        	}
        	
        }
        
        vm.sheltered = function(){
        	var shelteredUsers = [];
        	if(vm.selectedRows.length > 1 && !vm.disableActivate){
        		for(var index = 0; index < vm.selectedRows.length; index++ ){
        			shelteredUsers.push(vm.selectedRows[index].uid);
        		}
        		gridService.shelteredMultiple(shelteredUsers, vm.isActivated). then(function(response){
        			$window.scrollTo(0, 0);
        			toastService.showToast("Your request has been submitted.");
        			$timeout(() => {
                		$window.location.reload();
                    }, 3000);
        		});
        	}else if(vm.selectedRows.length == 1){
        		gridService.sheltered(vm.selectedRows[0].uid, vm.isActivated). then(function(response){
        			$window.scrollTo(0, 0);
        			toastService.showToast(response.data.message);
        			$timeout(() => {
                		$window.location.reload();
                    }, 3000);
        		});
        	}
        }
        	$http.get(`${baseUrl}/reports/view/`+vm.report.reportPath)
            .then(function success(response) {
                if(response.data !== null) {
                   vm.service = response.data.data;
                   vm.gridOptions.data = response.data.data;
                   vm.gridOptions.columnDefs = response.data.headers;
                   if(vm.service.length==0)
                	   {
	                	   vm.showNothing=true;
	                	   vm.showData=false;
                	   }
                   vm.headers= response.data.headers;
                }
                if(response.data == null){
                	
                }
            }, function error(error) {
                console.log(error);
            });
        
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
     
}
	
})();

