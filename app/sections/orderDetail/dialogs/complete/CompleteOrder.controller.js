(function(){
    angular
        .module('app')
        .controller('CompleteOrderController', CompleteOrderController);

    CompleteOrderController.$inject = ['$mdDialog', '$state', 'ordersService', 'orderCount', 'providerId'];

    function CompleteOrderController($mdDialog, $state, ordersService, orderCount, providerId) {
        let vm = this;

        vm.orderCount = orderCount;

        vm.leaveOrders = function() {
            $mdDialog.cancel();
            $state.go('volunteer-landing');
        };

        vm.getNextOrder = function() {
            return ordersService.getNextOrder(providerId);
        };

        vm.nextOrderComplete = function(response) {
            $mdDialog.hide(response);
        };
    }
})();