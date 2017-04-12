(function() {
    angular
        .module('app')
        .component('joinUser', {
            bindings: {

            },
            templateUrl: 'join_user.tpl.html',
            controller: JoinUserController,
            controllerAs: 'vm'
        });

    JoinUserController.$inject = ['$location', '$state', 'joinUserService'];

    function JoinUserController($location, $state, joinUserService) {
        var vm = this;
        
        vm.$onInit = function() {
        	var activationCode = $state.params.activationCode;
        	var userType = $state.params.type;
        	joinUserService.validateActivationCode(userType, activationCode).then(function successCallback(httpResponse) {
        		if (httpResponse && httpResponse.data.response == 'success') {
        			$state.go('dashboard');
        		} else {
        			console.log('Your invitation code expired');
        		}
        	}, function errorCallback(err){
        		debugger;
        		console.log(err);
        	});
        };
        
    }   
    
})();