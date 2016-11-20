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

    VolunteersController.$inject = ['$mdDialog', 'selectedNavItemService', 'personService'];

    function VolunteersController($mdDialog, selectedNavItemService, personService) {
        let vm = this;

        vm.$onInit = function () {
            selectedNavItemService.setSelectedItem("volunteers");

            personService.getPerson(3, 3, getPersonSuccess, getPersonFailure);

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
                    key: 'organization',
                    displayName: 'ORG',
                    sortable: true
                }
            ];

            vm.items = [
                {
                    id: 3,
                    firstName: 'Veronica',
                    lastName: 'Bagwell',
                    mobilePhone: '(479) 123-4567',
                    email: 'veronica.bagwell@walmart.com',
                    organization: 'The Manna Center'
                },
                {
                    id: 4,
                    firstName: 'Justin',
                    lastName: 'Palmer',
                    mobilePhone: '(479) 123-4567',
                    email: 'justin.palmer@walmart.com',
                    organization: 'Samaritan Community Center0'
                },
                {
                    id: 5,
                    firstName: 'Kayleigh',
                    lastName: 'Cooper',
                    mobilePhone: '(479) 123-4567',
                    email: 'kayleigh.cooper@walmart.com',
                    organization: 'The Manna Center'
                },
                {
                    id: 6,
                    firstName: 'Veronica',
                    lastName: 'Bagwell',
                    mobilePhone: '(479) 123-4567',
                    email: 'veronica.bagwell@walmart.com',
                    organization: 'The Manna Center'
                },
                {
                    id: 7,
                    firstName: 'Justin',
                    lastName: 'Palmer',
                    mobilePhone: '(479) 123-4567',
                    email: 'justin.palmer@walmart.com',
                    organization: 'Samaritan Community'
                },
                {
                    id: 8,
                    firstName: 'Kayleigh',
                    lastName: 'Cooper',
                    mobilePhone: '(479) 123-4567',
                    email: 'kayleigh.cooper@walmart.com',
                    organization: 'The Manna Center'
                }
            ];

            angular.forEach(vm.items, (item) => {
                item = angular.extend(item, {name: `${item.firstName} ${item.lastName}`});
            });

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

        vm.editVolunteer = function (volunteer) {
            $mdDialog.show({
                controller: 'EditVolunteerController',
                controllerAs: 'vm',
                parent: angular.element(document.body),
                templateUrl: getEditTemplate(),
                fullscreen: true,
                locals : {
                    volunteer : volunteer
                }
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

        function getEditTemplate() {
            let templateUrl = '';

            if(false) {
                templateUrl = 'edit-volunteer-ngoadmin.tpl.html';
            }
            else {
                templateUrl = 'edit-volunteer-superadmin.tpl.html';
            }

            return templateUrl;
        }

        function getPersonSuccess(response) {
            console.log(response);
        }

        function getPersonFailure(error) {
            console.log(error);
        }
    }
})();