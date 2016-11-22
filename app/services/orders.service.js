(function() {
    angular
        .module('app')
        .factory('ordersService', ordersService);

    ordersService.$inject = ['$http', 'serviceConstants'];

    function ordersService($http, serviceConstants) {
        let baseUrl = serviceConstants.baseUrl;

        return {
            getInitialOrder,
            getNextOrder
        };

        function getInitialOrder(success) {
            $http.get(`${baseUrl}/orders/1`)
                .then((response) => {
                    success(response.data)
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
    }
})();