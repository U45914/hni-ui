(function() {
    angular
        .module('app')
        .factory('userService', userService);

    userService.$inject = [];

    function userService() {
        let user = {};
        var organizations = [];
        let USER_ID = 'id';
        let USER_EMAIL = 'email';
        let FIRST_NAME = 'firstName';
        let LAST_NAME = 'lastName';
        let PHONE = 'mobilePhone';

        loadUserDetails();

        return {
            getUser: getUser,
            setUser: setUser,
            getOrganizations: getOrganizations
        };

        function getUser() {
            return user;
        }

        function setUser(data) {
            user = data;
            storeUserDetails(user.id, user.email, user.firstName, user.lastName, user.mobilePhone);
        }

        function loadUserDetails() {
            user.id = window.localStorage.getItem(USER_ID);
            user.email = window.localStorage.getItem(USER_EMAIL);
            user.fistName = window.localStorage.getItem(FIRST_NAME);
            user.lastName = window.localStorage.getItem(LAST_NAME);
            user.mobilePhone = window.localStorage.getItem(PHONE);
        }

        function storeUserDetails(id, email, firstName, lastName, mobilePhone) {
            window.localStorage.setItem(USER_ID, id);
            window.localStorage.setItem(USER_EMAIL, email);
            window.localStorage.setItem(FIRST_NAME, firstName);
            window.localStorage.setItem(LAST_NAME, lastName);
            window.localStorage.setItem(PHONE, mobilePhone);
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