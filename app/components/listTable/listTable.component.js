(function () {
    angular
        .module('app')
        .component('listTable', {
            bindings: {
                headerfields: '<',
                items: '=',
                editFn: '&',
                deleteFn: '&'
            },
            templateUrl: 'list-table.tpl.html',
            controller: ListTableController,
            controllerAs: 'vm'
        });

    ListTableController.$inject = ['$element', '$window', '$timeout'];

    function ListTableController($element, $window, $timeout) {
        let vm = this;
        vm.originalItemList = vm.items.slice();
        vm.lastSortField = null;

        vm.$onInit = function () {};

        vm.$postLink = function() {
            $timeout(() => {
                let tableScrollable = angular.element($element[0].querySelector('.list-table-scrollable'));
                let offset = $element[0].offsetTop;
                tableScrollable.css('max-height', `calc(100vh - ${offset}px - 120px)`);

                vm.thList = $element[0].querySelectorAll('.md-thead th');
                vm.trList = $element[0].querySelectorAll('.list-table-scrollable tr')[0].querySelectorAll('td');

                resizeWidths();
            });
        };

        angular.element($window).on('resize', ()=> {
            resizeWidths();
        });

        vm.delete = function(item) {
            vm.deleteFn()(item);
        };

        vm.edit = function(item) {
            vm.editFn()(item);
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

        function resizeWidths() {
            angular.forEach(vm.trList, (item, index) => {
                vm.thList[index].style['min-width'] = `${item.offsetWidth}px`;
                vm.thList[index].style['max-width'] = `${item.offsetWidth}px`;
            });
        }
    }
})();