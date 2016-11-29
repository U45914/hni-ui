(function(){
    angular
        .module('app')
        .controller('EditVolunteerController', EditVolunteerController);

    EditVolunteerController.$inject = ['$q', '$mdDialog', 'userService', 'personService', 'orgService', 'rolesConstant', 'volunteer'];

    function EditVolunteerController($q, $mdDialog, userService, personService, orgService, rolesConstant, volunteer) {
        let vm = this;

        let previousOrg = {id: volunteer.organizationId, value: volunteer.organization};
        let previousInfo = angular.copy(volunteer);

        vm.person = angular.copy(volunteer);
        vm.entityRole = vm.person.role;
        vm.rolesConstant = rolesConstant;
        vm.selectedOrgs = [];
        vm.orgAdminChecked = false;
        vm.toggleSelection = toggleSelection;

        orgService.getOrgs(userService.getUser().id, getOrgSuccess);

        delete vm.person['name'];
        delete vm.person['organization'];
        delete vm.person['role'];

        vm.dismiss = function () {
            $mdDialog.cancel();
        };

        vm.savePerson = function () {
            let promises = [personService.postPerson(vm.person)];

            if(previousInfo.organizationId !== vm.selectedOrg.id || previousInfo.role !== vm.entityRole) {
                promises.push(personService.removePerson(vm.person.id, previousInfo.organizationId));
                promises.push(personService.addToOrg(vm.person.id, vm.selectedOrg.id, vm.entityRole));
            }

            return $q.all(promises);
        };

        vm.personSaved = function() {
            volunteer = angular.extend(vm.person,
                {name: `${vm.person.firstName} ${vm.person.lastName}`},
                {role: vm.entityRole},
                {organization: vm.selectedOrg.value},
                {organizationId: vm.selectedOrg.id}
            );

            $mdDialog.hide(volunteer);
        };

        vm.changeRole = function(role) {
            vm.entityRole = role;
        };

        function toggleSelection(org) {
            vm.selectedOrg = org;
        }

        function getOrgSuccess(response) {
            vm.organizations = response.data.map(function (org) { return { value: org.name, id: org.id}; });
            vm.selectedOrg = previousOrg;
        }
    }
})();