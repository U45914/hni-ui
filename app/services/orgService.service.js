(function() {
    angular
        .module('app')
        .factory('orgService', orgService);

    orgService.$inject = ['$http', 'serviceConstants'];

    function orgService($http, serviceConstants) {
        let baseUrl = serviceConstants.baseUrl;

        return {
            getOrgs,
            postOrg,
            removeOrg
        };

        function getOrgs(id, success, failure) {
            $http.get(`${baseUrl}/organizations/users/${id}`)
                .then(function successCallback(response) {
                    success(response);
                }, function errorCallback(error) {
                    failure(error);
                });
        }

        function postOrg(data, success, failure) {
            let postData = JSON.stringify(data);

            return $http.post(`${baseUrl}/organizations`, postData)
                .then(() => {
                    success();
                }, (error) => {
                    failure(error);
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