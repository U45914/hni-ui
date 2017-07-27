(function(){
    angular
        .module('app')
        .controller('CompleteOrderController', CompleteOrderController);

    CompleteOrderController.$inject = ['$mdDialog', '$state', 'ordersService', 'orderCount', 'providerId','$q', 'orderId'];

    function CompleteOrderController($mdDialog, $state, ordersService, orderCount, providerId,$q,orderId) {
        let vm = this;

        vm.enableProceed = false;
        vm.orderCount = orderCount;
        vm.finishOrder = finishOrder;
        vm.finishAndGetNext = finishAndGetNext;
        vm.orderAmt = "";
        vm.confirmationId = "";
        
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
        
        vm.proceed = function(){
        	if(vm.confirmationId != null && vm.orderAmt != null && vm.confirmationId.trim() != "" && vm.orderAmt > 0)
        		vm.enableProceed = true;
        	else
        		vm.enableProceed = false;
        };
        
        function finishOrder() {
            return $q.all([ordersService.completeOrder(orderId,vm.confirmationId,vm.orderAmt)]);
        }
        
        function finishAndGetNext() {
             return ordersService.completeOrderAndGetNext(orderId,vm.confirmationId,vm.orderAmt).then(function(){
             	return vm.getNextOrder();
             });
        }
    }
})();