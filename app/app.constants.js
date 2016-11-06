(function() {
    angular
        .module('app')
        .constant('serviceConstants', {
            baseUrl: "http://hni-service-dev.azurewebsites.net/hni-admin/api/v1"
        })
        .constant('rolesConstant', {
            superAdmin: 'super_admin_role',
            ngoAdmin: 'ngo_admin_role',
            volunteer: 'volunteer_role'
        });
})();