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
        	$http.get('${baseUrl}/users/services')
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
})();