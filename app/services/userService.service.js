(function() {
    angular
        .module('app')
        .factory('userService', userService);

    userService.$inject = ['$http', 'serviceConstants'];

    function userService($http, serviceConstants) {
        var user = {
            firstName: '',
            lastName: '',
            mobilePhone: '',
            email: ''
        };
        var baseUrl = serviceConstants.baseUrl;

        setUser();

        return {
            getUser: getUser,
            setUser: setUser
        };

        function getUser() {
            return user;
        }

        function setUser() {
            $http.get(baseUrl + '/user/1')
                .then(setUserComplete)
                .catch(setUserFailed);
        }

        function setUserComplete(response) {
            var data = response.data;

            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.mobilePhone = data.mobilePhone;
            user.email = data.email;
        }

        function setUserFailed(error) {

        }
    }
})();