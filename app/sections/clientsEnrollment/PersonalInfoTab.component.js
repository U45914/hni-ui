(function() {
    angular
        .module('app')

        .directive('personalInfoTab', personalInfoDirective)


    function personalInfoDirective() {
        return {
            scope: {

            },
            restrict: "E",
            templateUrl: "personalInfoTab.tpl.html",
            controller: personalInfoController,
            controllerAs: 'vm'
        }

    }

    personalInfoController.$inject = ['$q', 'clientEnrollmentService', '$rootScope'];

    function personalInfoController($q, clientEnrollmentService, $rootScope) {
        var vm = this;

        vm.save = function() {
            var data = {
                "firstName": vm.user.firstName,
                "middleName": vm.user.middleName,
                "lastName": vm.user.lastName,
                "address": {
                    "name": vm.client.name,
                    "address1": vm.client.address1,
                    "address2": vm.client.address2,
                    "city": vm.client.city,
                    "state": vm.client.state,
                    "zip": vm.client.zip,
                },
                "ethnicity": vm.user.ethnicity,
                "phoneNumber": vm.user.phoneNumber,
                "bday": vm.client.bday,
                "beenArrested": vm.client.beenArrested,
                "felony": vm.user.felony
            };
            console.log("client personal Info : ");
            console.log(data);
            if (vm.user.ethnicity != null && vm.user.phoneNumber != null &&
                vm.client.bday != null) {
                var serviceCalls = clientEnrollmentService.setPersonnalData(data);
                //var serviceCalls = clientEnrollmentService.savePartial();
                $q.all(serviceCalls) // .then(onSuccess,onError);
                $rootScope.$broadcast("scroll-tab", [1, 2]);

            } else {
                window.alert("Please fill Fields");

                return false;
            }
        }

    }

})();