(function(){
    angular
        .module('app')
        .controller('EditVolunteerController', EditVolunteerController);

    EditVolunteerController.$inject = ['$mdDialog', 'userService', 'personService', 'volunteer'];

    function EditVolunteerController($mdDialog, userService, personService, volunteer) {
        let vm = this;

        vm.person = angular.copy(volunteer);
        vm.isSelected = isSelected;
        vm.toggleSelection = toggleSelection;
        vm.selectedOrgs = [];
        vm.organizations = userService.getOrganizations();
        vm.allOrgs = vm.organizations.map(function (org) { return { value: org.name }; });
        vm.orgAdminChecked = false;

        delete vm.person['name'];
        delete vm.person['organization'];

        vm.dismiss = function () {
            $mdDialog.hide();
        };

        vm.savePerson = function () {
            personService.postPerson(vm.person, editPersonSaved, editPersonError);

            function editPersonSaved() {
                volunteer = angular.extend(vm.person, {name: `${vm.person.firstName} ${vm.person.lastName}`});
                vm.person = {};
                $mdDialog.hide();
            }

            function editPersonError() {
                console.log("Error");
            }
        };

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