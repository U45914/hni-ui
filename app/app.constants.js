(function() {
    angular
        .module('app')
        .constant('serviceConstants', {
            baseUrl: "http://hni-api-dev.centralus.cloudapp.azure.com:8080/api/v1"
        })
        .constant('rolesConstant', {
            superAdmin: 'super_admin_role',
            ngoAdmin: 'ngo_admin_role',
            volunteer: 'volunteer_role'
        });
})();