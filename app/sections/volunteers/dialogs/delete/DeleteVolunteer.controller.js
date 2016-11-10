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
            personService.removeOrg(vm.volunteer.id, volunteeerDeletedSuccess, volunteerDeletedError);

            function volunteeerDeletedSuccess() {
                $mdDialog.hide();
            }

            function volunteerDeletedError() {
                console.log("Error");
            }
        };
    }
})();