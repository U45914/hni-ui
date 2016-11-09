(function() {
    angular
        .module('app')
        .factory('orgService', orgService);

    orgService.$inject = ['$http', 'serviceConstants'];

    function orgService($http, serviceConstants) {
        let baseUrl = serviceConstants.baseUrl;

        return {
            postOrg
        };

        function postOrg(data, success, failure) {
            let postData = JSON.stringify(data);

            $http.post(baseUrl + '/organizations', postData)
                .then(function successCallback() {
                    success();
                }, function errorCallback() {
                    failure();
                });
        }
    }
})();