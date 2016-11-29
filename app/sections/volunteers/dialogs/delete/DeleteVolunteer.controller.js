(function(){
    angular
        .module('app')
        .controller('DeleteVolunteerController', DeleteVolunteerController);

    DeleteVolunteerController.$inject = ['$mdDialog', 'personService', 'volunteer'];

    function DeleteVolunteerController($mdDialog, personService, volunteer) {
        let vm = this;

        vm.volunteer = volunteer;

        vm.dismiss = function () {
            $mdDialog.hide();
        };

        vm.deleteVolunteer = function() {
            return personService.removePerson(vm.volunteer.id, vm.volunteer.organizationId);
        };

        vm.volunteeerDeletedSuccess = function() {
            $mdDialog.hide(vm.volunteer);
        }
    }
})();