(function(){
    angular
        .module('app')
        .controller('EditClientController', EditClientController);

    EditClientController.$inject = ['$mdDialog', 'userService'];

    function EditClientController($mdDialog, userService) {
        let vm = this;

        vm.organizations = userService.getOrganizations();
        vm.selectOrgs = vm.organizations.map(function (org) { return { value: org.name }; });

        vm.dismiss = function () {
            $mdDialog.hide();
        };
    }
})();