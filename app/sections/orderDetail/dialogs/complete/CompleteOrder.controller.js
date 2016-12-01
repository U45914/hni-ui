(function(){
    angular
        .module('app')
        .controller('CompleteOrderController', CompleteOrderController);

    CompleteOrderController.$inject = ['$mdDialog', 'authService', 'ordersService', 'orderCount', 'providerId'];

    function CompleteOrderController($mdDialog, authService, ordersService, orderCount, providerId) {
        let vm = this;

        vm.orderCount = orderCount;

        vm.leaveOrders = function() {
            $mdDialog.cancel();
            authService.logout();
        };

        vm.getNextOrder = function() {
            return ordersService.getNextOrder(providerId);
        };

        vm.nextOrderComplete = function(response) {
            $mdDialog.hide(response);
        };
    }
})();