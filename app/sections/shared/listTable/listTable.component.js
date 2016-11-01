(function() {
    angular
        .module('app')
        .component('listTable', {
            bindings: {
                headerfields: '<',
                items: '<'
            },
            templateUrl: 'list-table.tpl.html',
            controller: ListTableController,
            controllerAs: 'vm'
        });

    ListTableController.$inject = [];

    function ListTableController() {
        let vm = this;

        vm.$onInit = function() {
            console.log(vm);
        };

        vm.getValue = function(item, field) {
            return item[field];
        }
    }
})();