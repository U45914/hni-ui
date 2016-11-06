(function() {
    angular
        .module('app')
        .service('authService', authService);

    authService.$inject = ['$q', '$http', 'rolesConstant', 'userService'];

    function authService($q, $http, rolesConstant, userService) {
        var LOCAL_TOKEN_KEY = 'token';
        var LOCAL_ROLE = 'role';
        var username = '';
        var isAuthenticated = false;
        var authRole = '';
        var authToken;

        loadUserCredentials();

        return {
            login: login,
            logout: logout,
            isAuthorized: isAuthorized,
            isAuthenticated: function() {return isAuthenticated;}
        };

        function loadUserCredentials() {
            var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
            var role = window.localStorage.getItem(LOCAL_ROLE);
            token = 'someToken';
            role = rolesConstant.superAdmin;
            if (token && role) {
                useCredentials(token, role);
            }
        }

        function storeUserCredentials(token, role) {
            window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
            window.localStorage.setItem(LOCAL_ROLE, role);
            useCredentials(token, role);
        }

        function useCredentials(token, role) {
            isAuthenticated = true;
            authToken = token;
            authRole = role;
        }

        function destroyUserCredentials() {
            authToken = undefined;
            authRole = undefined;
            username = '';
            isAuthenticated = false;
            window.localStorage.removeItem(LOCAL_TOKEN_KEY);
            window.localStorage.removeItem(LOCAL_ROLE);
        }

        function login(name, pw) {
            return $q(function(resolve, reject) {
                if ((name && pw)) {
                    storeUserCredentials(name, rolesConstant.superAdmin);
                    resolve('Login success.');
                } else {
                    reject('Login Failed.');
                }
            });
        }

        function logout() {
            destroyUserCredentials();
        }

        function isAuthorized(authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }

            return (isAuthenticated && authorizedRoles.indexOf(authRole) !== -1);
        }
    }
})();