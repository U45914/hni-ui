(function() {
    angular
        .module('app')
        .constant('serviceConstants', {
            baseUrl: "http://104.43.165.131:8080/api/v1"
        })
        .constant('rolesConstant', {
            superAdmin: '1',
            ngoAdmin: '2',
            volunteer: '3',
            client: '4',
            user: '5'
        })
        .constant('rolesConstantName', {
            superAdmin: 'Super Admin',
            ngoAdmin: 'NGOAdmin',
            volunteer: 'Volunteer',
            client: 'Client',
            user: 'User'
        });
})();