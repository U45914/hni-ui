(function() {
    angular
        .module('app')
        .factory('ordersService', ordersService);

    ordersService.$inject = ['$http', 'serviceConstants'];

    function ordersService($http, serviceConstants) {
        let baseUrl = serviceConstants.baseUrl;

        return {
            getInitialOrder,
            getNextOrder,
            getPaymentDetails,
            getOrderCount,
            completeOrder,
            unlockOrder
        };

        function getInitialOrder(success) {
            $http.get(`${baseUrl}/orders/next`)
                .then((response) => {
                    success(response)
                }, (error) => {
                    console.log(error);
                });
        }

        function getNextOrder(id) {
            return $http.get(`${baseUrl}/orders/next?providerId=${id}`);
        }

        function getPaymentDetails(orderId, providerId, amount) {
            return $http.get(`${baseUrl}/payments/payment-instruments?orderId=${orderId}`)
        }

        function getOrderCount() {
            return $http.get(`${baseUrl}/orders/count`);
        }

        function completeOrder(id) {
            return $http.put(`${baseUrl}/payments/order-payments?orderId=${id}`);
        }

        function unlockOrder(id) {
            $http.delete(`${baseUrl}/orders/lock/${id}`);
        }
    }
})();