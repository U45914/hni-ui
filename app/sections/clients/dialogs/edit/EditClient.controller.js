(function(){
    angular
        .module('app')
        .controller('EditClientController', EditClientController);

    EditClientController.$inject = ['$mdDialog', 'authService', 'userService', 'personService', 'orgService', 'rolesConstant', 'client'];

    function EditClientController($mdDialog, authService, userService, personService, orgService, rolesConstant, client) {
        let vm = this;

        let previousOrg = {id: client.organizationId, value: client.organization};

        vm.person = angular.copy(client);
        vm.role = authService.getRole();
        vm.rolesConstant = rolesConstant;

        orgService.getOrgs(userService.getUser().id, getOrgSuccess);

        delete vm.person['name'];
        delete vm.person['organization'];
        delete vm.person['organizationId'];

        vm.dismiss = function () {
            $mdDialog.cancel();
        };

        vm.savePerson = function () {
            if(previousOrg && previousOrg.id !== vm.selectedOrg.id) {
                personService.removeFromOrg(vm.person.id, previousOrg.id, 4);
            }

            personService.postPerson(vm.person, editPersonSaved, editPersonError);
            personService.addToOrg(vm.person.id, vm.selectedOrg.id, 4);
        };

        function getOrgSuccess(response) {
            vm.organizations = response.data.map(function (org) { return { value: org.name, id: org.id}; });
            vm.selectedOrg = previousOrg;
        }

        function editPersonSaved() {
            client = angular.extend(vm.person,
                {name: `${vm.person.firstName} ${vm.person.lastName}`},
                {organization: vm.selectedOrg.value},
                {organizationId: vm.selectedOrg.id}
            );
            $mdDialog.hide(client);
        }

        function editPersonError() {
            console.log("Error");
        }
    }
})();