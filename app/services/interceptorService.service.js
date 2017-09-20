(function() {
    angular
        .module('app')
        .factory('interceptorService', interceptorService);

    interceptorService.$inject = ['$injector', '$timeout'];

    function interceptorService($injector, $timeout) {
        return {
            'request': function(configuration) {
                let authService = $injector.get('authService');
                let token = window.localStorage.getItem("hni_token");

                if(token && token.length > 0) {
                    configuration.headers['X-hni-token'] = token;
                }

                return configuration;
            },

            responseError: function(rejection) {
                if (rejection.status === -1 || rejection.status === 401 || rejection.status === 403) {
                    let authService = $injector.get('authService');
                    let userService = $injector.get('userService');

                    authService.logout();
                }
            }
        };
    }
})();