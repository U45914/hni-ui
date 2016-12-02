(function(){
    angular
        .module('app')
        .controller('EditClientController', EditClientController);

    EditClientController.$inject = ['$q', '$mdDialog', 'authService', 'userService', 'personService', 'orgService', 'rolesConstant', 'client'];

    function EditClientController($q, $mdDialog, authService, userService, personService, orgService, rolesConstant, client) {
        let vm = this;

        let previousOrg = {id: client.organizationId, value: client.organization};

        vm.person = angular.copy(client);
        vm.role = authService.getRole();
        vm.rolesConstant = rolesConstant;

        orgService.getOrgs(getOrgSuccess);

        delete vm.person['name'];
        delete vm.person['organization'];
        delete vm.person['organizationId'];

        vm.dismiss = function () {
            $mdDialog.cancel();
        };

        vm.savePerson = function () {
            let serviceCalls = [personService.postPerson(vm.person), personService.addToOrg(vm.person.id, vm.selectedOrg.id, rolesConstant.client)];

            if(previousOrg && previousOrg.id !== vm.selectedOrg.id) {
                serviceCalls.push(personService.removeFromOrg(vm.person.id, previousOrg.id, 4));
            }

            return $q.all(serviceCalls);
        };

        vm.personSaved = function() {
            client = angular.extend(vm.person,
                {name: `${vm.person.firstName} ${vm.person.lastName}`},
                {organization: vm.selectedOrg.value},
                {organizationId: vm.selectedOrg.id}
            );

            $mdDialog.hide(client);
        };

        function getOrgSuccess(response) {
            vm.organizations = response.data.map(function (org) { return { value: org.name, id: org.id}; });
            vm.selectedOrg = previousOrg;
        }
    }
})();