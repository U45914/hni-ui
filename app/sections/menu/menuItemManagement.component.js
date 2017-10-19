(function() {
	angular.module('app').controller('menuItemManagementController', MenuItemManagementController);
	MenuItemManagementController.$inject = ['menuId', 'menuName', 'providerService'];

	function MenuItemManagementController(menuId, menuName, providerService) {
		var mimc = this;
		console.log(menuId);
		mimc.menuName = menuName;
		mimc.close = function(){
			$mdDialog.hide();
		}
		
		mimc.gridOptions = {
        		 data: [],
                 urlSync: false,
                 columnDefs:[{ name:'name'},
                             { name:'description'},
                             { name:'price'},
                             { name:'protien'},
                             { name:'fat'},
                             { name:'calories'},
                             { name:'carbs'},
                             { name:'expires'}
                             ],
                 enableFiltering: true,
                 multiSelect: true,
                 enableSelectAll: true,
                 enableColumnResizing: true,
                 paginationPageSizes: [25, 50, 100],
                 paginationPageSize: 50,
                 appScopeProvider: this,
        }
		
		providerService.getMenuItems(menuId).then(function(response){
			debugger;
			mimc.gridOptions.data = response.data.data;
			mimc.gridOptions.columnDefs = response.data.header;
		});
	
	}

})();