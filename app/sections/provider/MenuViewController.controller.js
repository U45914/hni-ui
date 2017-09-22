(function() {
	angular.module('app').controller('MenuViewController',
			MenuViewController);

	MenuViewController.$inject = [ '$scope', '$http', '$state',
			'serviceConstants', 'validateService', 'menu'];

	function MenuViewController($scope, $http, $state, serviceConstants,
			validateService, menu) {
		let mvc = this;
		// mdcvm.states = validateService.validateStateDrpdwn();

		mvc.menu = menu;
	}
})();