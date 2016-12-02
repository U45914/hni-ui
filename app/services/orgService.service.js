(function() {
    angular
        .module('app')
        .factory('orgService', orgService);

    orgService.$inject = ['$http', 'serviceConstants'];

    function orgService($http, serviceConstants) {
        let baseUrl = serviceConstants.baseUrl;

        return {
            getOrgs,
            getOrgUser,
            postOrg,
            removeOrg
        };

        function getOrgs(success, failure) {
            $http.get(`${baseUrl}/organizations/all`)
                .then(function successCallback(response) {
                    success(response);
                }, function errorCallback(error) {
                    failure(error);
                });
        }

        function getOrgUser(id) {
            return $http.get(`${baseUrl}/organizations/users/${id}`);
        }

        function postOrg(data) {
            let postData = JSON.stringify(data);

            return $http.post(`${baseUrl}/organizations`, postData)
                .then(() => {

                }, (error) => {

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