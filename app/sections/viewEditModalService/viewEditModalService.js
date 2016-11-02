(function () {
    angular
        .module('app')
        .factory('viewEditModalService', viewEditModalService);

    viewEditModalService.$inject = ['$mdDialog', 'userService'];

    function viewEditModalService($mdDialog, userService) {

        return {
            showPopup: showPopup
        };

        function showPopup() {
            $mdDialog.show({
                controller: ClientViewEditController,
                controllerAs: 'vm',
                parent: angular.element(document.body),
                fullscreen: false,
                templateUrl: 'view-edit-modal-service.tpl.html'
            });
        }

        function ClientViewEditController($mdDialog, userService) {
            let vm = this;
            vm.isSelected = isSelected;
            vm.toggleSelection = toggleSelection;
            vm.selectedOrgs = [];

            vm.organizations = userService.getOrganizations();
            vm.user = userService.getUser();
            vm.editingUser = {
                firstName: vm.user.firstName,
                lastName: vm.user.lastName,
                mobilePhone: vm.user.mobilePhone,
                email: vm.user.email
            };

            vm.hide = function () {
                $mdDialog.hide();
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
    }
    
})();