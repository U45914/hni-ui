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
            return $http.get(`${baseUrl}/payments/payment-instruments?orderId=${orderId}&providerId=${providerId}&amount=${amount}`)
        }

        function getOrderCount() {
            return $http.get(`${baseUrl}/orders/count`);
        }

        function completeOrder(data) {
            let postData = angular.toJson(data);

            return $http.post(`${baseUrl}/payments/order-payments`, postData);
        }

        function unlockOrder(id) {
            $http.delete(`${baseUrl}/orders/lock/${id}`);
        }
    }
})();