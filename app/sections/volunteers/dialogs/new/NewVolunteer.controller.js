(function(){
    angular
        .module('app')
        .controller('NewVolunteerController', NewVolunteerController);

    NewVolunteerController.$inject = ['$mdDialog', 'userService'];

    function NewVolunteerController($mdDialog, userService) {
        let vm = this;

        vm.organizations = userService.getOrganizations();
        vm.selectOrgs = vm.organizations.map(function (org) { return { value: org.name }; });

        vm.dismiss = function () {
            $mdDialog.hide();
        };
    }
})();