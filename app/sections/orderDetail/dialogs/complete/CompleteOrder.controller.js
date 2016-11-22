(function(){
    angular
        .module('app')
        .controller('CompleteOrderController', CompleteOrderController);

    CompleteOrderController.$inject = ['$mdDialog', '$state', 'orderCount'];

    function CompleteOrderController($mdDialog, $state, orderCount) {
        let vm = this;

        vm.orderCount = orderCount;

        vm.hide = function () {
            $mdDialog.hide();
        };

        vm.leaveOrders = function() {
            $mdDialog.hide();
            $state.go('dashboard');
        };

        vm.getNextOrder = function() {
            $mdDialog.hide();
            location.reload();
        }
    }
})();