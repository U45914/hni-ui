(function() {
    angular
        .module('app')
        .factory('interceptorService', interceptorService);

    interceptorService.$inject = ['$injector'];

    function interceptorService($injector) {
        return {
            'request': function(configuration) {
                let authService = $injector.get('authService');
                let token = authService.getToken();

                if(token && token.length > 0) {
                    configuration.headers['X-hni-token'] = token;
                }

                return configuration;
            },

            responseError: function(rejection) {
                if (rejection.status === -1) {
                    let authService = $injector.get('authService');
                    let userService = $injector.get('userService');
                    let state = $injector.get('$state');

                    authService.logout();
                    userService.removeUserDetails();
                    state.go('login');
                }
            }
        };
    }
})();