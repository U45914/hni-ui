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

    LoginController.$inject = ['authService', 'externalAuthService', 'validateService', '$state'];

    function LoginController(authService, externalAuthService, validateService, $state) {
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
        		 var response =  authService.login(vm.username, vm.password);
            	 console.log(response);
            	 /*if(response.status != 200){
            		 vm.signInButton = "Sign In";
            		 vm.validateCredentials = "Username/Password incorrect";
            		 vm.password="";
            		 vm.isDisabled = false;
            		 vm.loginFail = true;
            	 }else{
            		 vm.isDisabled = true;
            		 vm.loginFail = false;
            		 vm.validateCredentials = "";
            		 
                //$state.go('dashboard', {}, {reload: true});
            	 }*/
        	 }
        	 else{
        		 vm.signInButton = "Sign In";
        		 vm.isDisabled = false;
        		 vm.loginFail = true;
        	 }
        }
    }
})();