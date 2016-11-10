(function(){
    angular
        .module('app')
        .controller('EditVolunteerController', EditVolunteerController);

    EditVolunteerController.$inject = ['$mdDialog', 'userService'];

    function EditVolunteerController($mdDialog, userService) {
        let vm = this;

        vm.isSelected = isSelected;
        vm.toggleSelection = toggleSelection;
        vm.selectedOrgs = [];
        vm.querySearch = querySearch;
        vm.orgAdminChecked = false;

        vm.organizations = userService.getOrganizations();
        vm.user = userService.getUser();
        vm.editingUser = {
            firstName: vm.user.firstName,
            lastName: vm.user.lastName,
            mobilePhone: vm.user.mobilePhone,
            email: vm.user.email
        };

        vm.dismiss = function () {
            $mdDialog.hide();
        };

        function querySearch (query) {
            var results = query ? vm.organizations.filter( createFilterFor(query) ) : vm.organizations;

            return results;
        }

        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(organization) {
                return (organization.name.toLowerCase().indexOf(lowercaseQuery) === 0);
            };

        }

        function isSelected(org) {
            return vm.selectedOrgs.indexOf(org) > -1;
        }

        function toggleSelection(org) {
            if (isSelected(org)) {
                var index = vm.selectedOrgs.indexOf(org);
                vm.selectedOrgs.splice(index, 1);
            } else {
                vm.selectedOrgs.push(org);
            }
        }
    }
})();