(function() {
    angular
        .module('app')
        .component('dashboard', {
            bindings: {},
            template: `
            
           
            <top-nav></top-nav>
            			<div layout="row" layout-align="space-around none">
            				<md-content flex="20" layout-padding class="md-whiteframe-4dp">
		            			<left-nav-bar></left-nav-bar>
		            		</md-content>
		            		<md-content flex="80" layout-padding class="md-whiteframe-4dp">
		            		
		            			<div class="volunteer-landing-header-dashboard" layout="row" layout-wrap>
								    <div class="volunteer-welcome-header" style="margin-top: -35px;" flex="100">
								        <span class="material-icons">&#xE420;</span>
								        <div>Welcome {{welcomeName}}!</div>
								    </div>
								    <div class="volunteer-landing-subheader" flex="100">
								        Thank you for your interest in supporting Hunger: Not Impossible
								    </div>
								</div>

		                    	<actions-section></actions-section>
		                    	<div style:"margin-top:0px;">
		                        	<user-list></user-list>
		                        </div>
		                     </md-content>
	                     </div>
	                     
	                     <landing-footer></landing-footer>
                        `
        });
    
    DashboardController.$inject = ['$scope', 'userService'];
    
    function DashboardController($scope, authService) {
    	
    	 vm.$onInit = function() {
    		 vm.user = userService.getUser();
    		 vm.welcomeName = vm.user.firstName + " " + vm.user.lastName;
    		 $scope.welcomeName = vm.welcomeName;
         }
    	 
    	 window.onbeforeunload = function () {
    		  window.scrollTo(0, 0);
    		}
    	
    }
})();