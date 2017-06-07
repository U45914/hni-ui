(function() {
    angular
        .module('app')
        .component('landingHero', {
            bindings: {},
            templateUrl: 'landing-hero.tpl.html',
            controller: LandingHeroController,
            controllerAs: 'vm'
        });

    LandingHeroController.$inject = ['hashScroll','$state','$http','serviceConstants'];

    function LandingHeroController(hashScroll,$state,$http,serviceConstants) {
    	let baseUrl = serviceConstants.baseUrl;
        var vm = this;
        vm.participants=0;
        vm.meals =0;
        vm.scrollTo = function(hash) {
            hashScroll.scrollToHash(hash);
        };
               
        vm.login = function(){
        	$state.go('login');
        }
        
        vm.$onInit = function() {
            $http.get(`${baseUrl}/reports/view/get/customers/all/orders`).then(function success(response) {
            	if(response.data != null) {
            	vm.participants = response.data.data.totalClient;
            	vm.meals = response.data.data.totalOrders;
            	}
            } , function error(error) { 
                console.log(error);
            });
            }
       
    }   
})();