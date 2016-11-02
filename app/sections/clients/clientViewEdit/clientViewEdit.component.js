(function () {
    angular
        .module('app')
        .component('clientViewEdit', {
            bindings: {

            },
            templateUrl: 'client-view-edit.tpl.html',
            controller: ClientViewEditController,
            controllerAs: 'vm'
        });

    ClientViewEditController.$inject = ['userService'];

    function ClientViewEditController(userService) {
        let vm = this;
        vm.isSelected = isSelected;
        vm.toggleSelection = toggleSelection;
        vm.selectedOrgs = [];

        vm.$onInit = function () {
            vm.organizations = userService.getOrganizations();
            vm.user = userService.getUser();
            vm.editingUser = {
                firstName: vm.user.firstName,
                lastName: vm.user.lastName,
                mobilePhone: vm.user.mobilePhone,
                email: vm.user.email
            };
        };

        function isSelected(ngo) {
            return vm.selectedOrgs.indexOf(ngo) > -1;
        }

        function toggleSelection(ngo) {
            if (isSelected(ngo)) {
                var index = vm.selectedOrgs.indexOf(ngo);
                vm.selectedOrgs.splice(index, 1);
            } else {
                vm.selectedOrgs.push(ngo);
            }
        }
    }
})();