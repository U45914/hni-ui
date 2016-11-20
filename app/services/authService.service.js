(function() {
    angular
        .module('app')
        .service('authService', authService);

    authService.$inject = ['$q', '$http', 'rolesConstant', 'serviceConstants'];

    function authService($q, $http, rolesConstant, serviceConstants) {
        let baseUrl = serviceConstants.baseUrl;
        let LOCAL_TOKEN_KEY = 'hni_token';
        let LOCAL_ROLE = 'hni_role';
        let isAuthenticated = false;
        let authRole = '';
        let authToken;

        loadUserCredentials();

        return {
            login: login,
            loginExternal: loginExternal,
            logout: logout,
            isAuthorized: isAuthorized,
            isAuthenticated: () => isAuthenticated,
            getToken: () => authToken,
            getRole: () => authRole
        };

        function loadUserCredentials() {
            let token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
            let role = window.localStorage.getItem(LOCAL_ROLE);

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
            authToken = undefined;
            authRole = undefined;
            isAuthenticated = false;
            window.localStorage.removeItem(LOCAL_TOKEN_KEY);
            window.localStorage.removeItem(LOCAL_ROLE);
        }

        function isAuthorized(authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }

            return (isAuthenticated && authorizedRoles.indexOf(authRole) !== -1);
        }

        function loginExternal(provider, token, success, failure) {
            $http.get(`${baseUrl}/security/${provider}/authentication?access_token=${token}`)
                .then(function successCallback(response) {
                    storeUserCredentials(response.data.token, rolesConstant.superAdmin);
                    success(response);
                    window.localStorage.removeItem('google_state');
                    window.localStorage.removeItem('satellizer_token');
                }, function errorCallback(error) {
                    failure(error);
                });
        }
    }
})();