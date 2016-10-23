(function() {
    angular
        .module('app')
        .directive('filterInput', filterInput);

    filterInput.$inject = ['$filter'];

    function filterInput($filter) {
        return {
            restrict: 'A',
            scope: {
                filterInput: '='
            },
            link: link
        };

        function link(scope, element) {
            var copy = angular.copy(scope.filterInput);

            element.on('input', () => {
                scope.$apply(() => {
                    scope.filterInput = ($filter('orgFilter')(copy, element[0].value));
                })
            })
        }
    }
})();