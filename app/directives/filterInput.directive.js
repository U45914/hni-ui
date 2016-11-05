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

        function link(scope, element, attrs) {
            var copy = angular.copy(scope.filterInput);

            element.on('input', () => {
                scope.$apply(() => {
                    if(attrs.filterName) {
                        scope.filterInput = ($filter(attrs.filterName)(copy, element[0].value));
                    }
                    else {
                        scope.filterInput = ($filter('filter')(copy, element[0].value));
                    }
                })
            })
        }
    }
})();