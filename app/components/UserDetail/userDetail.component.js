(function() {
    angular
        .module('app')
        .component('userDetail', {
        bindings: {
           
        },
        transclude: true,
        templateUrl: 'user-detail.tpl.html',
        controller: userDetailController,
        controllerAs: 'vm'
    });
    
    function userDetailController() {
        var vm = this;
        
       // alert("entered");
    }
    
}
)();
