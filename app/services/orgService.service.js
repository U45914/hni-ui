(function() {
    angular
        .module('app')
        .factory('orgService', orgService);

    orgService.$inject = ['$http', 'serviceConstants'];

    function orgService($http, serviceConstants) {
        let baseUrl = serviceConstants.baseUrl;

        return {
            postOrg,
            removeOrg
        };

        function postOrg(data, success, failure) {
            let postData = JSON.stringify(data);

            $http.post(`${baseUrl}/organizations`, postData)
                .then(function successCallback() {
                    success();
                }, function errorCallback() {
                    failure();
                });
        }

        function removeOrg(id, success, failure) {
            $http.delete(`${baseUrl}/organizations/${id}`)
                .then(function successCallback() {
                    success();
                }, function errorCallback() {
                    failure();
                });
        }
    }
})();