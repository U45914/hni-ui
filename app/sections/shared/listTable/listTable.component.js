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

        vm.sortDataByField = function(field) {
            if (field.sortable) {
                
            }
        };
    }
})();