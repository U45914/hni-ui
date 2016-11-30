(function() {
    angular
        .module('app')
        .constant('serviceConstants', {
            baseUrl: "http://hni-api-dev3.centralus.cloudapp.azure.com:8080/api/v1"
        })
        .constant('rolesConstant', {
            superAdmin: '1',
            ngoAdmin: '2',
            volunteer: '3',
            client: '4',
            user: '5'
        });
})();