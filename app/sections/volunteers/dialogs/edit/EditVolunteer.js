(function(){
    angular
        .module('app')
        .controller('EditVolunteerController', EditVolunteerController);

    EditVolunteerController.$inject = ['$mdDialog', 'userService', 'personService', 'orgService', 'rolesConstant', 'volunteer'];

    function EditVolunteerController($mdDialog, userService, personService, orgService, rolesConstant, volunteer) {
        let vm = this;

        let previousOrg = {id: volunteer.organizationId, value: volunteer.organization};

        vm.person = angular.copy(volunteer);
        vm.entityRole = volunteer.role;
        vm.rolesConstant = rolesConstant;
        vm.isSelected = isSelected;
        vm.toggleSelection = toggleSelection;
        vm.selectedOrgs = [];
        vm.orgAdminChecked = false;

        orgService.getOrgs(userService.getUser().id, getOrgSuccess);

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

        vm.changeRole = function(role) {
            vm.entityRole = role;
        };

        function isSelected(org) {
            return vm.selectedOrgs.indexOf(org) > -1;
        }

        function toggleSelection(org) {
            vm.selectedOrg = org;
        }

        function getOrgSuccess(response) {
            vm.organizations = response.data.map(function (org) { return { value: org.name, id: org.id}; });
            vm.selectedOrg = previousOrg;
        }
    }
})();