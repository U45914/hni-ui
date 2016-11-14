(function(){
    angular
        .module('app')
        .controller('EditClientController', EditClientController);

    EditClientController.$inject = ['$mdDialog', 'userService', 'personService', 'client'];

    function EditClientController($mdDialog, userService, personService, client) {
        let vm = this;

        vm.person = angular.copy(client);

        vm.organizations = userService.getOrganizations();
        vm.selectOrgs = vm.organizations.map(function (org) { return { value: org.name }; });

        delete vm.person['name'];
        delete vm.person['organization'];

        vm.dismiss = function () {
            $mdDialog.hide();
        };

        vm.savePerson = function () {
            personService.postPerson(vm.person, editPersonSaved, editPersonError);

            function editPersonSaved() {
                client = angular.extend(vm.person, {name: `${vm.person.firstName} ${vm.person.lastName}`});
                vm.person = {};
                $mdDialog.hide();
            }

            function editPersonError() {
                console.log("Error");
            }
        };
    }
})();