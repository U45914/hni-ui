(function() {
    angular
        .module('app')
        .component('landingHero', {
            bindings: {},
            templateUrl: 'landing-hero.tpl.html',
            controller: LandingHeroController,
            controllerAs: 'vm'
        });

    LandingHeroController.$inject = ['hashScroll','$state','$http','serviceConstants','validateService'];

    function LandingHeroController(hashScroll,$state,$http,serviceConstants,validateService) {
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
            		var mealCount = response.data.data[0].MO;
            		vm.meals = mealCount;
            		//vm.meals = convertStateCode(mealCount);
            		vm.participants = response.data.data[1].totalParticipants;
            	}
            } , function error(error) { 
                console.log(error);
            });
            }
        
        function convertStateCode(mealCount){
        	var state = validateService.validateStateDrpdwn();
        	var result = {};
        	angular.forEach(mealCount, function(value, key){
        		angular.forEach(state, function(stateValue, stateKey){
        			if(stateValue.value == key){
        				result[stateValue.name] = value;
        			}
        		});
        		
        	});
        	return result;
        	
        }
       
    }   
})();