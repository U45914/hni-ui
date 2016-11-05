(function() {
    angular
        .module('app')
        .constant('serviceConstants', {
            baseUrl: "http://hni-service-dev.azurewebsites.net/hni-admin/api/v1"
        });
})();