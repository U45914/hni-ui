(function(){
    angular
        .module('app')
        .controller('NewClientController', NewClientController);

    NewClientController.$inject = ['$mdDialog', 'userService'];

    function NewClientController($mdDialog, userService) {
        let vm = this;

        vm.organizations = userService.getOrganizations();
        vm.selectOrgs = vm.organizations.map(function (org) { return { value: org.name }; });

        vm.dismiss = function () {
            $mdDialog.hide();
        };
    }
})();