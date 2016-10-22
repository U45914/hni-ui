(function() {
    angular
        .module('app')
        .constant('serviceConstants', {
            baseUrl: "http://hni-dev.southcentralus.cloudapp.azure.com:8080/hni-admin/api"
        });
})();