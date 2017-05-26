(function() {
    angular
        .module('app')
        .component('userDetail', {
        bindings: {
           
        },
        transclude: true,
        templateUrl: 'user-detail.tpl.html',
        controller: UserDetailController,
        controllerAs: 'vm'
    });
    
    UserDetailController.$inject = ['$scope', '$element', 'userService'];
    
    function UserDetailController($scope, $element, userService) {
        var vm = this;
        vm.user;
        
        
        vm.$onInit = function() {
            vm.user = userService.getUser();
            var num = vm.user.mobilePhone;
            if (num &&  num != null)
		      {
      		 num = num.split('-').join("");
      		 var newPhone = "";
      		 if (num.length >= 3) {
      			 newPhone = num.substring(0,3) + "-";
      		 }
      		 if (num.length > 3) {
      			 newPhone += num.substring(3, 6) + "-";
      		 }
      		 if (num.length > 6) {
      			 newPhone += num.substring(6, 10);
      		 }
      		 if (newPhone == "") {
                      newPhone = num;
               }
      		 vm.user.mobilePhone=newPhone;
		      }
        }

    }
    
}
)();
