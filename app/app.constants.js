(function() {
    angular
        .module('app')
        .constant('serviceConstants', {
            baseUrl: "http://localhost:8080/hni-admin-service/api/v1"
        })
        .constant('rolesConstant', {
            superAdmin: '1',
            ngoAdmin: '2',
            volunteer: '3',
            client: '4',
            user: '5'
        });
})();