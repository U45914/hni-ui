(function () {
    angular
        .module('app')
        .component('volunteers', {
            bindings: {

            },
            templateUrl: 'volunteers.tpl.html',
            controller: VolunteersController,
            controllerAs: 'vm'
        });

    VolunteersController.$inject = ['$mdDialog', 'topNavService'];

    function VolunteersController($mdDialog, topNavService) {
        let vm = this;

        vm.$onInit = function () {
            topNavService.setSelectedItem("volunteers");

            vm.headerFields = [
                {
                    key: 'name',
                    displayName: 'Name',
                    sortable: true
                },
                {
                    key: 'phone',
                    displayName: 'Phone',
                    sortable: false
                },
                {
                    key: 'email',
                    displayName: 'Email',
                    sortable: true
                },
                {
                    key: 'org',
                    displayName: 'ORG',
                    sortable: true
                }
            ];

            vm.items = [
                {
                    id: 3,
                    name: 'Veronica Bagwell',
                    phone: '(479) 123-4567',
                    email: 'veronica.bagwell@walmart.com',
                    org: 'The Manna Center'
                },
                {
                    id: 4,
                    name: 'Justin Palmer',
                    phone: '(479) 123-4567',
                    email: 'justin.palmer@walmart.com',
                    org: 'Samaritan Community'
                },
                {
                    id: 5,
                    name: 'Kayleigh Cooper',
                    phone: '(479) 123-4567',
                    email: 'kayleigh.cooper@walmart.com',
                    org: 'The Manna Center'
                },
                {
                    id: 6,
                    name: 'Veronica Bagwell',
                    phone: '(479) 123-4567',
                    email: 'veronica.bagwell@walmart.com',
                    org: 'The Manna Center'
                },
                {
                    id: 7,
                    name: 'Justin Palmer',
                    phone: '(479) 123-4567',
                    email: 'justin.palmer@walmart.com',
                    org: 'Samaritan Community'
                },
                {
                    id: 8,
                    name: 'Kayleigh Cooper',
                    phone: '(479) 123-4567',
                    email: 'kayleigh.cooper@walmart.com',
                    org: 'The Manna Center'
                }
            ];

            vm.user = {};
        };

        vm.newVolunteer = function () {
            $mdDialog.show({
                controller: 'NewVolunteerController',
                controllerAs: 'vm',
                parent: angular.element(document.body),
                templateUrl: 'new-volunteer.tpl.html',
                fullscreen: true
            });
        };

        vm.editVolunteer = function () {
            $mdDialog.show({
                controller: 'EditVolunteerController',
                controllerAs: 'vm',
                parent: angular.element(document.body),
                templateUrl: 'edit-volunteer.tpl.html',
                fullscreen: true
            });
        };

        vm.deleteVolunteer = function (volunteer) {
            $mdDialog.show({
                controller: 'DeleteVolunteerController',
                controllerAs: 'vm',
                parent: angular.element(document.body),
                templateUrl: 'delete-volunteer.tpl.html',
                locals : {
                    volunteer : volunteer
                }
            });
        };
    }
})();