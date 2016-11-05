(function() {
    angular
        .module('app')
        .directive('currencyInput', currencyInput);

    currencyInput.$inject = ['$filter'];

    function currencyInput($filter) {
        return {
            require: '?ngModel',
            link: function (scope, element, attrs, ctrl) {
                if (!ctrl) return;

                ctrl.$formatters.unshift(function () {
                    return $filter(attrs.currencyInput)(ctrl.$modelValue)
                });

                element.on('blur', format);

                scope.$on('$destroy', function () {
                    element.off('blur', format);
                });

                function format() {
                    var plainNumber = element.val().replace(/[^\d|\-+|\.+]/g, '');
                    element.val($filter(attrs.currencyInput)(plainNumber));
                }
            }
        };
    }
})();