<<<<<<< Updated upstream
(function() {
    angular
        .module('app')
        .component('actionsSection', {
            bindings: {},
            templateUrl: 'actions-section.tpl.html',
            controller: ActionSectionController,
            controllerAs: 'vm'
        });

    ActionSectionController.$inject = ['$http','userService'];

    function ActionSectionController($http,userService) {
        var vm = this;

        vm.$onInit = function() {
           // vm.userRole = 1;
        	$http.get('http://localhost:8080/hni-admin-service/api/v1/users/services')
            .then(function success(response) {
                if(response.data !== null) {
                   console.log("response : "+response.data);
                   vm.user = response.data ;
                }
            }, function error(error) {
                console.log(error);
            });
        };
    }
=======
(function() {
    angular
        .module('app')
        .component('actionsSection', {
            bindings: {},
            templateUrl: 'actions-section.tpl.html',
            controller: ActionSectionController,
            controllerAs: 'vm'
        });

    ActionSectionController.$inject = ['$http','userService'];

    function ActionSectionController($http,userService) {
        var vm = this;

        vm.$onInit = function() {
        	debugger;
           // vm.userRole = 1;
        	$http.get('http://localhost:8080/hni-admin-service/api/v1/users/services')
            .then(function success(response) {
                if(response.data !== null) {
                   console.log("response : "+response.data);
                   vm.user = response.data ;
                }
            }, function error(error) {
                console.log(error);
            });
        };
    }
>>>>>>> Stashed changes
})();