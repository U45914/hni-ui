(function () {
    angular
        .module('app')
        .component('outOfOrders', {
            bindings: {
                showIf: '=?'
            },
            templateUrl: 'out-of-orders.tpl.html'
        });
})();