(function() {
    angular
        .module('app')
        .component('actionsSection', {
            bindings: {},
            templateUrl: 'actions-section.tpl.html',
            controller: ActionSectionController,
            controllerAs: 'vm'
        });

    ActionSectionController.$inject = ['$scope', '$http','userService', 'serviceConstants'];

    function ActionSectionController($scope, $http,userService, serviceConstants) {
    	let baseUrl = serviceConstants.baseUrl;
        var vm = this;
         
   	 	vm.service = [];
   	 	vm.headers= [];
        
        vm.$onInit = function() {
        	let baseUrl = serviceConstants.baseUrl;
        	$http.get(`${baseUrl}/users/services`)
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