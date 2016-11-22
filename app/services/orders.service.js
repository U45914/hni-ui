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

        function getNextOrder(id, success) {
            $http.get(`${baseUrl}/orders/next?providerId=${id}`)
                .then((response) => {
                    success(response)
                }, (error) => {
                    console.log(error);
                });
        }

        function getPaymentDetails(id, amount) {
            return $http.get(`${baseUrl}/payments/payment-instruments?providerId=${id}&amount=${amount}`)
        }

        function getOrderCount() {
            return $http.get(`${baseUrl}/orders/count`);
        }

        function completeOrder(id) {
            return $http.put(`${baseUrl}/orders/completed/${id}`);
        }

        function unlockOrder(id) {
            $http.delete(`${baseUrl}/orders/lock/${id}`);
        }
    }
})();