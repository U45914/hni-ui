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
   	 	
        $scope.userList = [
		    {"firstname":"Chris", "lastname":"Tof", "age":28},
		    {"firstname":"Flo", "lastname":"Ran", "age":25},
		    {"firstname":"Dav", "lastname":"Yd", "age":30},
		    {"firstname":"Soni", "lastname":"Ya", "age":24}
		    ];
        
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