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
	
	reportGenerationController.$inject= ['$rootScope', '$scope','$http','serviceConstants'];
	
	function reportGenerationController($rootScope, $scope, $http, serviceConstants) {
		let baseUrl = serviceConstants.baseUrl;
        var vm = this;
        var selectedRow;
        vm.disableViewProfile = true;
        vm.report = $scope.ds;
        vm.showNothing=false;
        vm.showReport = {};
        vm.showData=true;
        vm.reportType = getReportKey(vm.report.label);
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
                 multiSelect: false,
                 enableCellEdit: true
        }
        
        vm.viewProfile = function(){
        	console.log(selectedRow);
        	console.log(selectedRow.entity.address);
        }
        vm.gridOptions.onRegisterApi = function(gridApi){
            //set gridApi on scope
           // $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope,function(row){
              selectedRow = row;
              if(row.isSelected){
            	  vm.disableViewProfile = false;
              }
              else{
            	  vm.disableViewProfile = true;
              }
            });
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

