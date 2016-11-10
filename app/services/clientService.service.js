(function() {
    angular
        .module('app')
        .factory('clientService', clientService);

    clientService.$inject = ['$http', 'serviceConstants'];

    function clientService($http, serviceConstants) {
        let baseUrl = serviceConstants.baseUrl;

        return {
            removeClient
        };

        function removeClient(id, success, failure) {
            $http.delete(`${baseUrl}/users/${id}`)
                .then(function successCallback() {
                    success();
                }, function errorCallback() {
                    failure();
                });
        }
    }
})();