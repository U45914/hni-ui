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

    LoginController.$inject = ['authService', 'externalAuthService', '$state'];

    function LoginController(authService, externalAuthService, $state) {
        var vm = this;
        vm.togglePassword = togglePassword;
        vm.inputType = 'password';
        vm.isActive = false;
        vm.signIn = signIn;
        vm.authenticate = authenticate;
        vm.isDisabled = false;
        vm.username="superuser@hni.com";
        vm.password="test123";
        vm.signInButton = "Sign In";
      
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
        	 //vm.isDisabled = true;
           var msg =  authService.login(vm.username, vm.password);
            	 console.log("response : "+ msg);
            	 if(msg == "error"){
            		 vm.signInButton = "Sign In";
            		 vm.isDisabled = false;
            	 }else{
                //$state.go('dashboard', {}, {reload: true});
            	 }
        }
    }
})();