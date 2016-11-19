(function() {
    angular
        .module('app')
        .factory('personService', personService);

    personService.$inject = ['$http', 'serviceConstants'];

    function personService($http, serviceConstants) {
        let baseUrl = serviceConstants.baseUrl;

        return {
            getPerson,
            postPerson,
            removePerson
        };

        function getPerson(orgId, roleId, success, failure) {
            $http.get(`${baseUrl}/users/organizations/${orgId}/roles/${roleId}`)
                .then(function successCallback(response) {
                    success(response);
                }, function errorCallback() {
                    failure();
                });
        }

        function postPerson(data, success, failure) {
            let postData = JSON.stringify(data);

            $http.post(`${baseUrl}/users`, postData)
                .then(function successCallback() {
                    success();
                }, function errorCallback() {
                    failure();
                });
        }

        function removePerson(id, success, failure) {
            $http.delete(`${baseUrl}/users/${id}`)
                .then(function successCallback() {
                    success();
                }, function errorCallback() {
                    failure();
                });
        }
    }
})();