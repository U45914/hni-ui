(function() {
    angular
        .module('app')
        .factory('gridService', gridService);

    gridService.$inject = ['$http'];

    function gridService($http) {

        return {
        	activation: activation,
        	sheltered : sheltered,
        	deletion : deletion
        };

        function activation(data, value) {
        }
        
        function sheltered(data, value) {
        }
        
        function deletion(data) {
        }
    }
})();