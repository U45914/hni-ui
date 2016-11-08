(function() {
    angular
        .module('app')
        .factory('userService', userService);

    userService.$inject = ['$http', 'serviceConstants'];

    function userService($http, serviceConstants) {
        let user = {
            firstName: 'Veronica',
            lastName: 'Bagwell',
            mobilePhone: '(479) 313 - 5602',
            email: 'veronica.bagwell@walmart.com'
        };
        var organizations = [];
        var baseUrl = serviceConstants.baseUrl;

        setUser();

        return {
            getUser: getUser,
            setUser: setUser,
            getOrganizations: getOrganizations
        };

        function getUser() {
            return user;
        }

        function setUser() {
            $http.get(baseUrl + '/users/1')
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

        function getOrganizations() {
            for(var i = 0; i < 5; i++) {
                organizations.push({name: "Samaritan Community Center" + i, address: "2510 N 17th St #203Rogers, AR 72756", phone: "(479) 246-0104", website: "http://www.samcc.org", logo: "app/assets/images/scc_logo.jpg"});
                organizations.push({name: "Care Community Center" + i, address: "2510 N 17th St #203Rogers, AR 72756", phone: "(479) 246-0104", website: "http://www.samcc.org", logo: "app/assets/images/scc_logo.jpg"});
            }

            return organizations;
        }
    }
})();