(function() {
	angular.module('app').controller('MenuViewController',
			MenuViewController);

	MenuViewController.$inject = [ '$scope', '$http', '$state',
			'serviceConstants', 'providerService', 'menu'];

	function MenuViewController($scope, $http, $state, serviceConstants,
			providerService, menu) {
		let mvc = this;

		mvc.menu = menu;
		
		mvc.menuItemsGridOptions = {
				data : [],
				urlSync : false,
				columnDefs : [],
				multiSelect : true,
				enableSelectAll : false,
				paginationPageSizes : [ 25, 50, 100 ],
				paginationPageSize : 50,
				appScopeProvider : this
		};
		providerService.getMenuItems(mvc.menu.id).then(function(response){
			mvc.menuItemsGridOptions.data = response.data.data;
			mvc.menuItemsGridOptions.columnDefs = response.data.headers;
		});
	}
})();