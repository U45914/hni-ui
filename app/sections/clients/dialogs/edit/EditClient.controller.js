(function(){
    angular
        .module('app')
        .controller('EditClientController', EditClientController);

    EditClientController.$inject = ['$mdDialog', 'userService', 'personService', 'orgService','client'];

    function EditClientController($mdDialog, userService, personService, orgService, client) {
        let vm = this;

        let previousOrg = null;

        vm.person = angular.copy(client);
        vm.selectedOrg = null;

        orgService.getOrgs(userService.getUser().id, getOrgSuccess);
        orgService.getOrgUser(vm.person.id, getOrgUserSuccess);

        delete vm.person['name'];
        delete vm.person['organization'];

        vm.dismiss = function () {
            $mdDialog.hide();
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
            console.log(response.data[0]);
        }

        function getOrgUserSuccess(response) {
            vm.selectedOrg = previousOrg = { value: response.data[0].name, id: response.data[0].id};
        }

        function editPersonSaved() {
            client = angular.extend(vm.person, {name: `${vm.person.firstName} ${vm.person.lastName}`});
            vm.person = {};
            $mdDialog.hide();
        }

        function editPersonError() {
            console.log("Error");
        }
    }
})();