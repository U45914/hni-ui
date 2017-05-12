(function() {
    angular
        .module('app')
        .factory('userService', userService);

    userService.$inject = [];

    function userService() {
        let user = {};
        const USER_ID = 'hni_id';
        const USER_EMAIL = 'hni_email';
        const FIRST_NAME = 'hni_firstName';
        const LAST_NAME = 'hni_lastName';
        const PHONE = 'hni_mobilePhone';
        const ORGANIZATION_NAME = 'hni_organizationName';

        loadUserDetails();

        return {
            getUser: getUser,
            setUser: setUser,
            removeUserDetails,
            loadUserDetails
        };

        function getUser() {
            return user;
        }

        function setUser(data) {
            user = data;
            storeUserDetails(user.id, user.email, user.firstName, user.lastName, user.mobilePhone, user.organizationName);
        }

        function loadUserDetails() {
            user.id = window.localStorage.getItem(USER_ID);
            user.email = window.localStorage.getItem(USER_EMAIL);
            user.firstName = window.localStorage.getItem(FIRST_NAME);
            user.lastName = window.localStorage.getItem(LAST_NAME);
            user.mobilePhone = window.localStorage.getItem(PHONE);
            user.organizationName =  window.localStorage.getItem(ORGANIZATION_NAME);
        }

        function storeUserDetails(id, email, firstName, lastName, mobilePhone, organizationName) {
            window.localStorage.setItem(USER_ID, id);
            window.localStorage.setItem(USER_EMAIL, email);
            window.localStorage.setItem(FIRST_NAME, firstName);
            window.localStorage.setItem(LAST_NAME, lastName);
            window.localStorage.setItem(PHONE, mobilePhone);
            window.localStorage.setItem(ORGANIZATION_NAME, organizationName);
        }

        function removeUserDetails() {
            user.id = window.localStorage.removeItem(USER_ID);
            user.email = window.localStorage.removeItem(USER_EMAIL);
            user.firstName = window.localStorage.removeItem(FIRST_NAME);
            user.lastName = window.localStorage.removeItem(LAST_NAME);
            user.mobilePhone = window.localStorage.removeItem(PHONE);
        }
    }
})();