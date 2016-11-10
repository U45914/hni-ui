(function () {
    angular
        .module('app')
        .component('listTable', {
            bindings: {
                headerfields: '<',
                items: '<',
                editFn: '&',
                deleteFn: '&'
            },
            templateUrl: 'list-table.tpl.html',
            controller: ListTableController,
            controllerAs: 'vm'
        });

    ListTableController.$inject = [];

    function ListTableController() {
        let vm = this;
        vm.originalItemList = vm.items.slice();
        vm.lastSortField = null;

        vm.$onInit = function () {

        };

        vm.delete = function(item) {
            vm.deleteFn()(item);
        };

        vm.sortDataByField = function (field) {
            if (field.sortable) {
                if (vm.lastSortField === field) {

                    if (vm.hasSortedDecesding) {
                        //We've used this field before and have sorted decesding, so reset the sorting
                        vm.items = vm.originalItemList.slice();
                        vm.hasSortedDecesding = false;

                    } else {
                        //Sort decesding
                        vm.hasSortedDecesding = true;

                        vm.items.sort(function (item1, item2) {
                            if (item1[field.key] < item2[field.key]) {
                                return 1;
                            }

                            if (item1[field.key] > item2[field.key]) {
                                return -1;
                            }

                            return 0;
                        });
                    }

                } else {
                    //First sort, so sort ascending
                    vm.lastSortField = field;
                    vm.hasSortedDecesding = false;

                    vm.items.sort(function (item1, item2) {
                        if (item1[field.key] < item2[field.key]) {
                            return -1;
                        }

                        if (item1[field.key] > item2[field.key]) {
                            return 1;
                        }

                        return 0;
                    });
                }
            }
        };
    }
})();