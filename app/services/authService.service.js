(function() {
    angular
        .module('app')
        .service('authService', authService);

    authService.$inject = ['$http', '$timeout', '$state', 'userService', 'rolesConstant', 'serviceConstants'];

    function authService($http, $timeout, $state, userService, rolesConstant, serviceConstants) {
        let baseUrl = serviceConstants.baseUrl;
        let LOCAL_TOKEN_KEY = 'hni_token';
        let LOCAL_ROLE = 'hni_role';
        let LOCAL_PERMISSIONS = 'hni_permissions';
        let isAuthenticated = false;
        let authRole = '';
        let authToken = '';
        let authPermissions = '';

        loadUserCredentials();

        return {
            login,
            loginExternal,
            logout,
            isAuthorized,
            isAuthenticated: () => isAuthenticated,
            getToken: () => authToken,
            getRole: () => authRole,
            getPermissions: () => authPermissions
        };

        function loadUserCredentials() {
            let token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
            let role = window.localStorage.getItem(LOCAL_ROLE);
            let permissions = window.localStorage.getItem(LOCAL_PERMISSIONS);

            if (token && role && permissions) {
                isAuthenticated = true;
                authToken = token;
                authRole = role;
                authPermissions = permissions;
            }
        }

        function setToken(token) {
            window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
            isAuthenticated = true;
            authToken = token;
        }

       function login(username, password) {
        	var vm = {
        			username : username,
        			password : password
        	}
        	var msg;
        	$http.post(`${baseUrl}/security/authentication`, vm).then(function (response) {
                
                if(response == null){
                	msg = "error";
                }else{
               // setToken(response.data.token);
				debugger;
                //$state.go('volunteer-landing');
                $state.go('dashboard');
                msg="success";
                }
              //  return msg;
              
            }/*, function error(error) {
            	alert("error : "+error);
				debugger;
                console.log(error);
            }*/);
        	return msg;
        }
        
        /*function login(username, password){
        	var payLoad ={
        			method: "POST",
        			url: "http://localhost:8080/hni-admin-service/api/v1/security/authentication",
        			data: {"username":username, "password":password}        			
        	}
        	
        	$http(payLoad).then(successResp, errorResp);
        }
        
        function successResp(data, status, headers, config){
        	console.log(resp);
        }
        
        function errorResp(){
        	console.log("error happened");
        }
*/
        function loginExternal(provider, token) {
            $http.get(`${baseUrl}/security/${provider}/authentication?access_token=${token}`)
                .then(function successCallback(response) {
                    if(response.data.token !== null) {
                        setToken(response.data.token);
                        userService.setUser(response.data.user);
                        setPermissions();
                    }
                }, function errorCallback(error) {
                    console.log(error);
                });
        }

        function logout() {
            $state.go('login');

            $timeout(() => {
                authToken = undefined;
                authRole = undefined;
                isAuthenticated = false;
                window.localStorage.removeItem(LOCAL_TOKEN_KEY);
                window.localStorage.removeItem(LOCAL_ROLE);

                userService.removeUserDetails();
            }, 300)
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
                    $state.go('volunteer-landing');
                }, (error) => {
                    console.log(error);
                });
        }

        function setRole(data) {
            let roles = data.roles;
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

            window.localStorage.setItem(LOCAL_PERMISSIONS, data.permissions);
            window.localStorage.setItem(LOCAL_ROLE, role);
            authPermissions = data.permissions.join();
            authRole = role;
        }
    }
})();