(function() {
    angular
        .module('app')
        .component('login', {
            bindings: {

            },
            templateUrl: 'login.tpl.html',
            controller: LoginController,
            controllerAs: 'vm'
        });

    LoginController.$inject = ['authService', 'externalAuthService', 'validateService', '$state', 'toastService'];

    function LoginController(authService, externalAuthService, validateService, $state, toastService) {
        var vm = this;
        vm.togglePassword = togglePassword;
        vm.inputType = 'password';
        vm.isActive = false;
        vm.signIn = signIn;
        vm.authenticate = authenticate;
        vm.isDisabled = false;
        vm.signInButton = "Sign In";
        vm.loginFail = false;
        vm.validateCredentials = "";
      
        function authenticate(provider) {
            externalAuthService.googleAuthenticate()
                .then((response) => {
                    authService.loginExternal(provider, response["access_token"]);
                });
        }

        function togglePassword(){
            vm.isActive = !vm.isActive;
            vm.inputType = vm.isActive ? 'text' : 'password';
        }

        function signIn() {
        	 vm.signInButton = "Signing In ...";
        	 vm.isDisabled = true;
        	 vm.validateCredentials = validateService.validateCredentials(vm.username, vm.password);
        	 if( vm.validateCredentials == ""){
        		 authService.login(vm.username, vm.password)
        		 	.then((response) => {
        		 		if (response) {
        		 			vm.validateCredentials = "";
        		 			authService.setLoginResponse(response);   
        		 			$state.go('dashboard');
        		 			toastService.showToast("Welcome " + response.data.user.firstName +" "+response.data.user.lastName +" !");
        		 		} else {
        		 			vm.validateCredentials = "Username/Password incorrect";
        		 			vm.isDisabled = false;
            		 		vm.signInButton = "SIGN IN";
        		 		}
        		 		
        		 	});
        	 } else{
        		 vm.signInButton = "Sign In";
        		 vm.isDisabled = false;
        		 vm.loginFail = true;
        	 }
        }
    }
})();