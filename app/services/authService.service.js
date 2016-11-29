(function() {
    angular
        .module('app')
        .service('authService', authService);

    authService.$inject = ['$http', '$state', 'userService', 'rolesConstant', 'serviceConstants'];

    function authService($http, $state, userService, rolesConstant, serviceConstants) {
        let baseUrl = serviceConstants.baseUrl;
        let LOCAL_TOKEN_KEY = 'hni_token';
        let LOCAL_ROLE = 'hni_role';
        let isAuthenticated = false;
        let authRole = '';
        let authToken;

        loadUserCredentials();

        return {
            login,
            loginExternal,
            logout,
            isAuthorized,
            isAuthenticated: () => isAuthenticated,
            getToken: () => authToken,
            getRole: () => authRole
        };

        function loadUserCredentials() {
            let token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
            let role = window.localStorage.getItem(LOCAL_ROLE);

            if (token && role) {
                isAuthenticated = true;
                authToken = token;
                authRole = role;
            }
        }

        function setToken(token) {
            window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
            isAuthenticated = true;
            authToken = token;
        }

        function login(name, pw) {

        }

        function loginExternal(provider, token) {
            $http.get(`${baseUrl}/security/${provider}/authentication?access_token=${token}`)
                .then(function successCallback(response) {
                    setToken(response.data.token);
                    userService.setUser(response.data.user);
                    setPermissions();
                    window.localStorage.removeItem('google_state');
                    window.localStorage.removeItem('satellizer_token');
                }, function errorCallback(error) {
                    console.log(error);
                });
        }

        function logout() {
            authToken = undefined;
            authRole = undefined;
            isAuthenticated = false;
            window.localStorage.removeItem(LOCAL_TOKEN_KEY);
            window.localStorage.removeItem(LOCAL_ROLE);

            userService.removeUserDetails();
        }

        function isAuthorized(authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }

            return (isAuthenticated && authorizedRoles.indexOf(authRole) !== -1);
        }

        function setPermissions() {
            $http.post(`${baseUrl}/security/authorization`)
                .then((response) => {
                    setRole(response.data);
                    $state.go('order-detail');
                }, (error) => {
                    console.log(error);
                });
        }

        function setRole(permissions) {
            let roles = permissions.roles;
            let role = '';

            if(roles.indexOf(rolesConstant.superAdmin) !== -1) {
                role = rolesConstant.superAdmin;
            }
            else if(roles.indexOf(rolesConstant.ngoAdmin) !== -1) {
                role = rolesConstant.ngoAdmin;
            }
            else if(roles.indexOf(rolesConstant.volunteer) !== -1) {
                role = rolesConstant.volunteer;
            }
            else if(roles.indexOf(rolesConstant.client) !== -1) {
                role = rolesConstant.client;
            }
            else if(roles.indexOf(rolesConstant.user) !== -1) {
                role = rolesConstant.user;
            }

            window.localStorage.setItem(LOCAL_ROLE, role);
            authRole = role;

            window.localStorage.setItem(LOCAL_ROLE, rolesConstant.superAdmin);
            authRole = rolesConstant.superAdmin;
        }
    }
})();